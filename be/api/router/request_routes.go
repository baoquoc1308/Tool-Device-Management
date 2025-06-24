package api

import (
	"BE_Manage_device/api/handler"
	"BE_Manage_device/api/middleware"
	"BE_Manage_device/config"
	repository "BE_Manage_device/internal/repository/user_session"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func registerRequestTransferRoutes(api *gin.RouterGroup, h *handler.RequestTransferHandler, session repository.UsersSessionRepository, db *gorm.DB) {
	api.Use(middleware.AuthMiddleware(config.AccessSecret, session))

	api.POST("/request-transfer", middleware.RequirePermission([]string{"transfer-assets"}, []string{"full", "can-request"}, db), h.Create) // đã check
	api.PATCH("/request-transfer/confirm/:id", middleware.RequirePermission([]string{"transfer-assets"}, nil, db), h.Accept)                // đã check
	api.PATCH("/request-transfer/deny/:id", middleware.RequirePermission([]string{"transfer-assets"}, nil, db), h.Deny)                     // đã check
	api.GET("/request-transfer/:id", middleware.RequirePermission([]string{"transfer-assets"}, nil, db), h.GetRequestTransferById)          // đã check
	api.GET("/request-transfer/filter", middleware.RequirePermission([]string{"transfer-assets"}, nil, db), h.FilterRequestTransfer)        // đã check

}
