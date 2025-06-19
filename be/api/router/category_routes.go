package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerCategoriesRoutes(api *gin.RouterGroup, h *handler.CategoriesHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.POST("/categories", middleware.RequirePermission([]string{"manage-taxonomy"}, nil, db), h.Create)       // đã check
	api.GET("/categories", h.GetAll)                                                                            // đã check
	api.DELETE("/categories/:id", middleware.RequirePermission([]string{"manage-taxonomy"}, nil, db), h.Delete) // đã check

}
