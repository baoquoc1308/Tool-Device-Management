package pkg

import (
	"BE_Manage_device/constant"
	"BE_Manage_device/internal/domain/dto"
)

func Null() interface{} {
	return nil
}

func BuildReponse[T any](responseStatus constant.ResponseStatus, data T) dto.ApiResponse[T] {
	return BuildReponse_(responseStatus.GetResponseStatus(), responseStatus.GetResponseMessage(), data)
}

func BuildReponse_[T any](status string, message string, data T) dto.ApiResponse[T] {
	return dto.ApiResponse[T]{
		ResponseKey:     status,
		ResponseMessage: message,
		Data:            data,
	}
}
