package handler

import (
	"BE_Manage_device/config"
	"BE_Manage_device/constant"
	"BE_Manage_device/internal/domain/dto"
	"BE_Manage_device/internal/domain/entity"
	service "BE_Manage_device/internal/service/categories"
	"BE_Manage_device/pkg/utils"

	"BE_Manage_device/pkg"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

const (
	cacheKeyCategories = "categories:all"
)

type CategoriesHandler struct {
	service *service.CategoriesService
}

func NewCategoriesHandler(service *service.CategoriesService) *CategoriesHandler {
	return &CategoriesHandler{service: service}
}

// User godoc
// @Summary      Create categories
// @Description  Create categories
// @Tags         Categories
// @Accept       json
// @Produce      json
// @Param        category   body    dto.CreateCategoryRequest   true  "Data"
// @param Authorization header string true "Authorization"
// @Router       /api/categories [POST]
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
func (h *CategoriesHandler) Create(c *gin.Context) {
	defer pkg.PanicHandler(c)
	var request dto.CreateCategoryRequest
	userId := utils.GetUserIdFromContext(c)
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Error("Happened error when mapping request from FE. Error", err)
		pkg.PanicExeption(constant.InvalidRequest, "Happened error when mapping request from FE.")
	}
	location, err := h.service.Create(userId, request.CategoryName)
	if err != nil {
		log.Error("Happened error when create category. Error", err)
		pkg.PanicExeption(constant.UnknownError, "Happened error when create category. Error: "+err.Error())
	}
	config.Rdb.Del(config.Ctx, cacheKeyCategories)
	c.JSON(http.StatusCreated, pkg.BuildReponseSuccess(http.StatusCreated, constant.Success, location))
}

// User godoc
// @Summary      Get all categories
// @Description  Get all categories
// @Tags         Categories
// @Accept       json
// @Produce      json
// @param Authorization header string true "Authorization"
// @Router       /api/categories [GET]
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
func (h *CategoriesHandler) GetAll(c *gin.Context) {
	defer pkg.PanicHandler(c)
	userId := utils.GetUserIdFromContext(c)
	var categories []*entity.Categories
	val, err := config.Rdb.Get(config.Ctx, cacheKeyCategories).Result()
	if err == nil {
		// ✅ Dữ liệu có trong Redis, trả về
		var cached []entity.Categories
		if err := json.Unmarshal([]byte(val), &cached); err == nil {
			for _, a := range cached {
				copy := a
				categories = append(categories, &copy)
			}
		} else {
			log.Error("Happened error when get all categories. Error", err)
			pkg.PanicExeption(constant.UnknownError, "Happened error when get all categories in redis")
		}
	} else {
		categories, err = h.service.GetAll(userId)
		if err != nil {
			log.Error("Happened error when get all categories. Error", err)
			pkg.PanicExeption(constant.UnknownError, "Happened error when get all categories")
		}
	}
	// ✅ Cache lại dữ liệu
	bytes, _ := json.Marshal(categories)
	config.Rdb.Set(config.Ctx, cacheKeyCategories, bytes, initialTTL)
	c.JSON(http.StatusOK, pkg.BuildReponseSuccess(http.StatusOK, constant.Success, categories))
}

// User godoc
// @Summary      Delete category
// @Description   Delete category via id
// @Tags         Categories
// @Accept       json
// @Produce      json
// @Param		id	path		string				true	"id"
// @param Authorization header string true "Authorization"
// @Router       /api/categories/{id} [DELETE]
// @securityDefinitions.apiKey token
// @in header
// @name Authorization
// @Security JWT
func (h *CategoriesHandler) Delete(c *gin.Context) {
	defer pkg.PanicHandler(c)
	id := c.Param("id")
	IdConvert, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		log.Error("Happened error when get id via path. Error", err)
		pkg.PanicExeption(constant.UnknownError, "Happened error when get id via path")
	}

	err = h.service.Delete(IdConvert)
	if err != nil {
		log.Error("Happened error when delete category. Error", err)
		pkg.PanicExeption(constant.UnknownError, err.Error())
	}
	config.Rdb.Del(config.Ctx, cacheKeyCategories)
	c.JSON(http.StatusOK, pkg.BuildReponseSuccessNoData(http.StatusOK, constant.Success))
}
