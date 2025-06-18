package utils

import log "github.com/sirupsen/logrus"

func LogEmailError(action string, to string, err error) {
	log.WithFields(log.Fields{
		"action": action,
		"to":     to,
		"error":  err,
	}).Error("❌ Gửi email thất bại")
}

func LogEmailSuccess(action string, to string) {
	log.WithFields(log.Fields{
		"action": action,
		"to":     to,
	}).Info("✅ Gửi email thành công")
}
