package repository

import (
	"BE_Manage_device/internal/domain/entity"

	"gorm.io/gorm"
)

type PostgreSQLDepartmentsRepository struct {
	db *gorm.DB
}

func NewPostgreSQLDepartmentsRepository(db *gorm.DB) DepartmentsRepository {
	return &PostgreSQLDepartmentsRepository{db: db}
}

func (r *PostgreSQLDepartmentsRepository) Create(department *entity.Departments) (*entity.Departments, error) {
	result := r.db.Create(department)
	return department, result.Error
}

func (r *PostgreSQLDepartmentsRepository) GetAll(companyId int64) ([]*entity.Departments, error) {
	departments := []*entity.Departments{}
	result := r.db.Model(entity.Departments{}).Where("company_id = ?").Preload("Location").Find(&departments)
	return departments, result.Error
}

func (r *PostgreSQLDepartmentsRepository) Delete(id int64) error {
	result := r.db.Model(entity.Departments{}).Where("id = ?", id).Delete(entity.Departments{})
	return result.Error
}

func (r *PostgreSQLDepartmentsRepository) GetDepartmentById(id int64) (*entity.Departments, error) {
	department := &entity.Departments{}
	result := r.db.Model(entity.Departments{}).Where("id = ?", id).First(department)
	if result.Error != nil {
		return nil, result.Error
	}
	return department, nil
}
