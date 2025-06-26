package entity

type Departments struct {
	Id             int64  `gorm:"primaryKey;autoIncrement" json:"id"`
	DepartmentName string `gorm:"uniqueIndex:uniq_dept_location_company" json:"departmentName"`
	LocationId     int64  `gorm:"uniqueIndex:uniq_dept_location_company" json:"locationId"`
	CompanyId      int64  `gorm:"uniqueIndex:uniq_dept_location_company" json:"-"`

	Location Locations `gorm:"foreignKey:LocationId;references:Id"`
}
