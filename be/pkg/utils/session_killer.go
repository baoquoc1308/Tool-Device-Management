package utils

import (
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
)

// KillIdleSessions terminates sessions that are idle in transaction > 5 minutes
// and logs the result to PostgreSQL table `session_kill_logs`.
func KillIdleSessions(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return fmt.Errorf("failed to get raw DB: %w", err)
	}

	query := `
		SELECT 
			now(),
			pid,
			usename,
			COALESCE(client_addr::text, ''),
			query,
			state,
			now() - query_start,
			pg_terminate_backend(pid)
		FROM pg_stat_activity
		WHERE 
			state = 'idle in transaction'
			AND now() - query_start > interval '5 minutes'
	`

	rows, err := sqlDB.Query(query)
	if err != nil {
		return fmt.Errorf("query error: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var (
			killedAt   time.Time
			pid        int
			usename    string
			clientAddr string
			queryText  string
			state      string
			duration   time.Duration
			terminated bool
		)

		if err := rows.Scan(&killedAt, &pid, &usename, &clientAddr, &queryText, &state, &duration, &terminated); err != nil {
			log.Printf("Scan error: %v", err)
			continue
		}

		// Ghi vào bảng session_kill_logs
		_, err := sqlDB.Exec(`
			INSERT INTO session_kill_logs 
			(killed_at, pid, usename, client_addr, query, state, duration, terminated)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		`, killedAt, pid, usename, clientAddr, queryText, state, duration, terminated)

		if err != nil {
			log.Printf("Insert log error: %v", err)
		} else {
			log.Printf("✅ Session pid=%d terminated and logged", pid)
		}
	}

	log.Println("✔ Idle sessions checked and logged to DB.")
	return nil
}
