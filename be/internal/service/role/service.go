package service

import (
	"BE_Manage_device/internal/domain/entity"
	role "BE_Manage_device/internal/repository/role"
)

type RoleService struct {
	repo role.RoleRepository
}

func NewRoleService(repo role.RoleRepository) *RoleService {
	return &RoleService{repo: repo}
}

func (service *RoleService) GetAllRole() []*entity.Roles {
	roles := service.repo.GetAllRole()
	return roles
}
