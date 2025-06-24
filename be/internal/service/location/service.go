package service

import (
	"BE_Manage_device/internal/domain/entity"
	location "BE_Manage_device/internal/repository/locations"
)

type LocationService struct {
	repo location.LocationRepository
}

func NewLocationService(repo location.LocationRepository) *LocationService {
	return &LocationService{repo: repo}
}

func (service *LocationService) Create(LocationName string) (*entity.Locations, error) {
	var location = &entity.Locations{
		LocationName: LocationName,
	}
	locationCreate, err := service.repo.Create(location)
	if err != nil {
		return nil, err
	}
	return locationCreate, nil
}

func (service *LocationService) GetAll() ([]*entity.Locations, error) {
	locations, err := service.repo.GetAll()
	if err != nil {
		return nil, err
	}
	return locations, err
}

func (service *LocationService) Delete(id int64) error {
	err := service.repo.Delete(id)
	return err
}
