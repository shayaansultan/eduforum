package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/shayaansultan/eduforum/server/model"
)

// GetThreadByID returns a thread by its ID
func GetThreadByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thread ID"})
		return
	}

	thread, err := model.GetThreadByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error getting thread: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, thread)
}
