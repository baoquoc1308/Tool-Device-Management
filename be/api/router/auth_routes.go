package api

import (
	"BE_Manage_device/api/handler"

	"github.com/gin-gonic/gin"
)

func registerAuthRoutes(api *gin.RouterGroup, h *handler.UserHandler, sse *handler.SSEHandler) {
	api.POST("/auth/register", h.Register)
	api.POST("/auth/login", h.Login)
	api.POST("/auth/refresh", h.Refresh)
	api.GET("/activate", h.Activate)
	api.POST("/user/forget-password", h.CheckPasswordReset)
	api.PATCH("/user/password-reset", h.ResetPassword)
	api.DELETE("/user/:email", h.DeleteUser)
	api.POST("/notify/:userId", sse.SendNotificationHandler)
}
