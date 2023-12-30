package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/shayaansultan/eduforum/server/model"
)

func GetThread(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thread ID"})
		return
	}

	thread, err := model.GetThreadByID(id)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Thread not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching thread"})
		}
		return
	}

	c.JSON(http.StatusOK, thread)
}

func GetAllThreads(c *gin.Context) {
	threads, err := model.GetAllThreads()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching threads"})
		return
	}

	c.JSON(http.StatusOK, threads)
}

func CreateThread(c *gin.Context) {
	var thread model.Thread
	if err := c.ShouldBindJSON(&thread); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Error binding thread data: %s", err.Error())})
		return
	}

	if thread.Title == "" || thread.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title and content are required"})
		return
	}

	if err := model.CreateThread(&thread); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error creating thread: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, thread)
}

func UpdateThread(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thread ID"})
		return
	}

	var thread model.Thread
	if err := c.ShouldBindJSON(&thread); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	thread.ThreadID = id // Set the thread ID from the URL

	if thread.Title == "" || thread.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title and content are required"})
		return
	}

	if err := model.UpdateThread(&thread); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, thread)
}

func DeleteThread(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thread ID"})
		return
	}

	if err := model.DeleteThread(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error deleting thread: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Thread deleted"})
}
