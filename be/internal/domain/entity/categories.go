package entity

type Categories struct {
	Id           int64  `gorm:"primaryKey;autoIncrement" json:"id"`
	CategoryName string `gorm:"uniqueIndex:idx_category_company" json:"categoryName"`
	CompanyId    int64  `gorm:"uniqueIndex:idx_category_company" json:"-"`
}
