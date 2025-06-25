package handler

import (
	"BE_Manage_device/constant"
	"BE_Manage_device/internal/domain/dto"
	service "BE_Manage_device/internal/service/company"
	"BE_Manage_device/pkg"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type CompanyHandler struct {
	service *service.CompanyService
}

func NewCompanyHandler(service *service.CompanyService) *CompanyHandler {
	return &CompanyHandler{service: service}
}

// Company godoc
// @Summary      Create Company
// @Description  Create Company
// @Tags         Company
// @Accept       json
// @Produce      json
// @Param        department   body    dto.CreateCompanyRequest   true  "Data"
// @param Authorization header string true "Authorization"
// @Router       /api/company [POST]
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
func (h *CompanyHandler) Create(c *gin.Context) {
	defer pkg.PanicHandler(c)
	var request dto.CreateCompanyRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Error("Happen error when mapping request from FE. Error: ", err.Error())
		pkg.PanicExeption(constant.InvalidRequest, "Happen error when mapping request from FE. Error: "+err.Error())
	}
	company, err := h.service.Create(request.CompanyName, request.Email)
	if err != nil {
		log.Error("Happen error when create company Error: ", err.Error())
		pkg.PanicExeption(constant.InvalidRequest, "Happen error when create company Error: "+err.Error())
	}
	c.JSON(http.StatusCreated, pkg.BuildReponseSuccess(http.StatusCreated, constant.Success, company))
}

// Company godoc
// @Summary      Get Company by id
// @Description  Create Company by id
// @Tags         Company
// @Accept       json
// @Produce      json
// @Param		id	path		string				true	"id"
// @param Authorization header string true "Authorization"
// @Router       /api/company/{id} [POST]
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
func (h *CompanyHandler) GetCompanyById(c *gin.Context) {
	defer pkg.PanicHandler(c)
	idStr := c.Param("id")
	companyId, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		log.Error("Happened error when convert companyId to int64. Error", err)
		pkg.PanicExeption(constant.InvalidRequest, "Happened error when convert companyId to int64")
	}
	company, err := h.service.GetCompanyById(companyId)
	if err != nil {
		log.Error("Happened error when get company by id. Error ", err.Error())
		pkg.PanicExeption(constant.UnknownError, "Happened error when get company by id"+err.Error())
	}
	c.JSON(http.StatusOK, pkg.BuildReponseSuccess(http.StatusOK, constant.Success, company))
}
