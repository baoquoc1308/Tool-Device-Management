package service

import (
	"BE_Manage_device/internal/domain/entity"
	company "BE_Manage_device/internal/repository/company"
)

type CompanyService struct {
	repo company.CompanyRepository
}

func NewCompanyService(repo company.CompanyRepository) *CompanyService {
	return &CompanyService{repo: repo}
}

func (service *CompanyService) Create(companyName, email string) (*entity.Company, error) {

	var Company = &entity.Company{
		CompanyName: companyName,
		Email:       email,
	}
	companyCreate, err := service.repo.Create(Company)
	return companyCreate, err
}

func (service *CompanyService) GetCompanyById(id int64) (*entity.Company, error) {
	company, err := service.repo.GetCompanyById(id)
	return company, err
}
