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

func GetAllThreads(c *gin.Context) {
	threads, err := model.GetAllThreads()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error getting threads: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, threads)
}

func CreateThread(c *gin.Context) {
	thread := &model.Thread{}
	err := c.ShouldBindJSON(&thread)
	if err != nil || thread.Title == "" || thread.Content == "" || thread.UserID <= 0 || thread.CategoryID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thread data"})
		return
	}

	err = model.CreateThread(thread.Title, thread.Content, thread.UserID, thread.CategoryID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error creating thread: %s", err.Error())})
		return
	}

	res := fmt.Sprintf("Thread %s created", thread.Title)

	c.JSON(http.StatusOK, gin.H{"message": res})
}
