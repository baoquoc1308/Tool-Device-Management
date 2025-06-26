package service

import (
	"BE_Manage_device/internal/repository"
	assetS "BE_Manage_device/internal/service/asset"
	assetLogS "BE_Manage_device/internal/service/asset_log"
	assignmentS "BE_Manage_device/internal/service/assignment"
	categoriesS "BE_Manage_device/internal/service/categories"
	company "BE_Manage_device/internal/service/company"
	departmentS "BE_Manage_device/internal/service/departments"
	emailS "BE_Manage_device/internal/service/email"
	locationS "BE_Manage_device/internal/service/location"
	maintenanceSchedulesS "BE_Manage_device/internal/service/maintenance_schedules"
	notificationS "BE_Manage_device/internal/service/notification"
	requestTransferS "BE_Manage_device/internal/service/request_transfer"
	roleS "BE_Manage_device/internal/service/role"
	userS "BE_Manage_device/internal/service/user"
)

type Services struct {
	User                 *userS.UserService
	Location             *locationS.LocationService
	Categories           *categoriesS.CategoriesService
	Department           *departmentS.DepartmentsService
	Assets               *assetS.AssetsService
	Role                 *roleS.RoleService
	Assignment           *assignmentS.AssignmentService
	AssetLog             *assetLogS.AssetLogService
	RequestTransfer      *requestTransferS.RequestTransferService
	MaintenanceSchedules *maintenanceSchedulesS.MaintenanceSchedulesService
	Notification         *notificationS.NotificationService
	Email                *emailS.EmailService
	Company              *company.CompanyService
}

func NewServices(repos *repository.Repository, emailPass string) *Services {
	emailService := emailS.NewEmailService(emailPass)
	notificationService := notificationS.NewNotificationService(repos.Notification)

	assignmentService := assignmentS.NewAssignmentService(
		repos.Assignment,
		repos.AssetsLog,
		repos.Assets,
		repos.Department,
		repos.User,
		notificationService,
	)

	return &Services{
		User:                 userS.NewUserService(repos.User, emailService, repos.UserSession, repos.Role, repos.Assets, repos.UserRBAC),
		Location:             locationS.NewLocationService(repos.Location),
		Categories:           categoriesS.NewCategoriesService(repos.Categories),
		Department:           departmentS.NewDepartmentsService(repos.Department),
		Assets:               assetS.NewAssetsService(repos.Assets, repos.AssetsLog, repos.Role, repos.UserRBAC, repos.User, repos.Assignment, repos.Department, notificationService),
		Role:                 roleS.NewRoleService(repos.Role),
		Assignment:           assignmentService,
		AssetLog:             assetLogS.NewAssetLogService(repos.AssetsLog, repos.User, repos.Role, repos.Assets),
		RequestTransfer:      requestTransferS.NewRequestTransferService(repos.RequestTransfer, assignmentService, repos.User, repos.Assets),
		MaintenanceSchedules: maintenanceSchedulesS.NewMaintenanceSchedulesService(repos.MaintenanceSchedules, repos.Assets, repos.User, notificationService),
		Notification:         notificationService,
		Email:                emailService,
		Company:              company.NewCompanyService(repos.Company),
	}
}
