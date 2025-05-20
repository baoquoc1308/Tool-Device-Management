package repository

import "BE_Manage_device/internal/domain/entity"

type UserRBAC interface {
	GetAllUserByRoleId(roleId int64) []*entity.Users
}
