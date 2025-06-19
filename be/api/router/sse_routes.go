package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerSSEHandlerRoutes(api *gin.RouterGroup, h *handler.SSEHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.GET("/sse", h.SSEHandle)

}
