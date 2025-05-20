package repository

import "BE_Manage_device/internal/domain/entity"

type RoleRepository interface {
	GetAllUserByRoleId(roleId int64) []*entity.Users
}
