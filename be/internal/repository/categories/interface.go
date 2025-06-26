package repository

import "BE_Manage_device/internal/domain/entity"

type CategoriesRepository interface {
	Create(*entity.Categories) (*entity.Categories, error)
	GetAll(companyId int64) ([]*entity.Categories, error)
	Delete(id int64) error
}
