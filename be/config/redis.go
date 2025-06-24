package config

import (
	"context"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var (
	Ctx = context.Background()
	Rdb *redis.Client
)

func InitRedis() {
	redisURL := os.Getenv("REDIS_URL") // Ví dụ: redis://default:password@host:port
	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("❌ Failed to parse Redis URL: %v", err)
	}

	Rdb = redis.NewClient(opt)

	if _, err := Rdb.Ping(Ctx).Result(); err != nil {
		log.Fatalf("❌ Redis connection failed: %v", err)
	}

	log.Println("✅ Connected to Redis!")
}
