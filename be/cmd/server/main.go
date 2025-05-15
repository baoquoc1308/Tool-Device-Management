package main

import (
	"BE_Manage_device/api"
	"BE_Manage_device/api/handler"
	"BE_Manage_device/config"
	"BE_Manage_device/internal/database"
	"BE_Manage_device/internal/domain/service"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	db := config.ConnectToDB()
	userRepository := database.NewPostgreSQLUserRepository(db)

	emailService := service.NewEmailService(config.SmtpPasswd)

	//user
	userService := service.NewUserService(userRepository, emailService)
	userHandler := handler.NewUserHandler(userService)

	r := gin.Default()
	api.SetupRoutes(r, userHandler)

	// r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	if err := r.Run(config.Port); err != nil {
		log.Fatal("failed to run server:", err)
	}

}
