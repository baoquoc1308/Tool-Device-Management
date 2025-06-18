package utils

import (
	"math"
	"time"
)

// Hàm tính giá trị còn lại của tài sản
func CurrentAssetValue(
	originalCost float64,
	salvageValue float64,
	usefulLifeYears float64,
	startDate, currentDate time.Time,
) float64 {

	// Tính số năm đã sử dụng (dạng float, có thể lẻ tháng)
	yearsUsed := currentDate.Sub(startDate).Hours() / (24 * 365)

	if yearsUsed < 0 {
		yearsUsed = 0 // chưa đến ngày bắt đầu sử dụng
	}
	if yearsUsed > usefulLifeYears {
		yearsUsed = usefulLifeYears // không vượt quá thời gian sử dụng
	}

	annualDepreciation := (originalCost - salvageValue) / usefulLifeYears
	accumulatedDepreciation := yearsUsed * annualDepreciation

	// Giá trị còn lại không thấp hơn salvage value
	currentValue := math.Max(originalCost-accumulatedDepreciation, salvageValue)
	return currentValue
}
