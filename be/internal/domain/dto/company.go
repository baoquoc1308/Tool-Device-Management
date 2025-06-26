package dto

type CreateCompanyRequest struct {
	CompanyName string `json:"companyName"`
	Email       string `json:"email"`
}
