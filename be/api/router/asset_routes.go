package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerAssetsRoutes(api *gin.RouterGroup, h *handler.AssetsHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.POST("/assets", middleware.RequirePermission([]string{"manage-assets"}, []string{"full", "limited"}, db), h.Create)    // đã check
	api.GET("/assets/:id", h.GetAssetById)                                                                                     // đã check
	api.GET("/assets", h.GetAllAsset)                                                                                          // đã check
	api.GET("/assets/filter", h.FilterAsset)                                                                                   // đã check
	api.PUT("/assets/:id", middleware.RequirePermission([]string{"manage-assets"}, []string{"full", "limited"}, db), h.Update) // đã check
	api.DELETE("/assets/:id", middleware.RequirePermission([]string{"manage-assets"}, nil, db), h.DeleteAsset)
	api.PATCH("/assets-retired/:id", middleware.RequirePermission([]string{"lifecycle-update", "manage-assets"}, nil, db), h.UpdateAssetRetired)      // đã check
	api.GET("/assets/filter-dashboard", middleware.RequirePermission([]string{"dashboards"}, []string{"full", "scoped"}, db), h.FilterAssetDashboard) // đã check
	api.GET("/assets/request-transfer", h.GetAssetsByCateOfDepartment)
	api.GET("/assets/maintenance-schedules", h.GetAllAssetNotHaveMaintenance)

}
