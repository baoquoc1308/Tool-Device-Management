package service

import (
	"BE_Manage_device/internal/domain/entity"
	"BE_Manage_device/pkg/utils"

	categories "BE_Manage_device/internal/repository/categories"
	company "BE_Manage_device/internal/repository/company"
	user "BE_Manage_device/internal/repository/user"
)

type CategoriesService struct {
	repo        categories.CategoriesRepository
	userRepo    user.UserRepository
	companyRepo company.CompanyRepository
}

func NewCategoriesService(repo categories.CategoriesRepository, userRepo user.UserRepository, companyRepo company.CompanyRepository) *CategoriesService {
	return &CategoriesService{repo: repo, userRepo: userRepo, companyRepo: companyRepo}
}

func (service *CategoriesService) Create(userId int64, categoryName string) (*entity.Categories, error) {
	user, err := service.userRepo.FindByUserId(userId)
	if err != nil {
		return nil, err
	}
	company, err := service.companyRepo.GetCompanyBySuffixEmail(utils.GetSuffixEmail(user.Email))
	var category = &entity.Categories{
		CategoryName: categoryName,
		CompanyId:    company.Id,
	}
	categoryCreate, err := service.repo.Create(category)
	if err != nil {
		return nil, err
	}
	return categoryCreate, nil
}

func (service *CategoriesService) GetAll() ([]*entity.Categories, error) {
	categories, err := service.repo.GetAll()
	if err != nil {
		return nil, err
	}
	return categories, err
}

func (service *CategoriesService) Delete(id int64) error {
	err := service.repo.Delete(id)
	return err
}
