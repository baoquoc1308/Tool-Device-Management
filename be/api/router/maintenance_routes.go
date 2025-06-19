package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerMaintenanceSchedulesRoutes(api *gin.RouterGroup, h *handler.MaintenanceSchedulesHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.POST("/maintenance-schedules", middleware.RequirePermission([]string{"maintenance-logs"}, nil, db), h.Create)
	api.GET("/maintenance-schedules/:id", middleware.RequirePermission([]string{"maintenance-logs"}, []string{"full", "view"}, db), h.GetAllMaintenanceSchedulesByAssetId)
	api.PATCH("/maintenance-schedules/:id", middleware.RequirePermission([]string{"maintenance-logs"}, nil, db), h.Update)
	api.DELETE("/maintenance-schedules/:id", middleware.RequirePermission([]string{"maintenance-logs"}, nil, db), h.Delete)
	api.GET("/maintenance-schedules", middleware.RequirePermission([]string{"maintenance-logs"}, []string{"full", "view"}, db), h.GetAllMaintenanceSchedules) // đã check

}
