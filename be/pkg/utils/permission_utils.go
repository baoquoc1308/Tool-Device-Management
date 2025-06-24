package utils

import (
	"BE_Manage_device/internal/domain/entity"
	"slices"

	"gorm.io/gorm"
)

func UserHasPermission(db *gorm.DB, userId int64, permSlug []string, accessLevel []string) (bool, error) {
	var user entity.Users
	err := db.Preload("Role.RolePermissions.Permission").
		First(&user, userId).Error
	if err != nil {
		return false, err
	}

	for _, rolePerm := range user.Role.RolePermissions {
		if accessLevel == nil {
			if slices.Contains(permSlug, rolePerm.Permission.Slug) && rolePerm.AccessLevel == "full" {
				return true, nil
			}
		} else {
			if slices.Contains(permSlug, rolePerm.Permission.Slug) && slices.Contains(accessLevel, rolePerm.AccessLevel) {
				return true, nil
			}
		}
	}
	return false, nil
}
