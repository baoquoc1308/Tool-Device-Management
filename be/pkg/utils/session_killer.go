package utils

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/gorm"
)

// KillIdleSessions terminates sessions that are idle in transaction > 5 minutes
// and logs the result to a CSV file.
func KillIdleSessions(db *gorm.DB, logPath string) error {
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

	// Open log file
	logFile, err := os.OpenFile(logPath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("log file error: %w", err)
	}
	defer logFile.Close()
	writer := csv.NewWriter(logFile)

	// Write header if file is new
	if stat, _ := logFile.Stat(); stat.Size() == 0 {
		writer.Write([]string{"killed_at", "pid", "usename", "client_addr", "query", "state", "duration", "terminated"})
	}

	// Loop through results
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

		record := []string{
			killedAt.Format(time.RFC3339),
			fmt.Sprintf("%d", pid),
			usename,
			clientAddr,
			queryText,
			state,
			duration.String(),
			fmt.Sprintf("%v", terminated),
		}

		writer.Write(record)
	}

	writer.Flush()
	log.Println("✔ Idle sessions killed and logged.")
	return nil
}
