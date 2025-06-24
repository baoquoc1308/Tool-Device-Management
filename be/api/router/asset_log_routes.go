package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerAssetLogsRoutes(api *gin.RouterGroup, h *handler.AssetLogHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.GET("/assets-log/:id", middleware.RequirePermission([]string{"audit-logs"}, []string{"full", "partial"}, db), h.GetLogByAssetId) // đã check

}
