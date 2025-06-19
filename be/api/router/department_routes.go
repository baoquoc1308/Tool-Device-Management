package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerDepartmentRoutes(api *gin.RouterGroup, h *handler.DepartmentsHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.POST("/departments", middleware.RequirePermission([]string{"manage-taxonomy"}, nil, db), h.Create)       // đã check
	api.GET("/departments", h.GetAll)                                                                            // đã check
	api.DELETE("/departments/:id", middleware.RequirePermission([]string{"manage-taxonomy"}, nil, db), h.Delete) // đã check

}
