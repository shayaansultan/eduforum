package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/shayaansultan/eduforum/server/model"
)

// GetCommentByID returns a comment by its ID
func GetCommentByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
		return
	}

	comment, err := model.GetCommentByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, comment)
}

// GetCommentsByThreadID returns all comments for a thread
func GetCommentsByThreadID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thread ID"})
		return
	}

	comments, err := model.GetCommentsByThreadID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, comments)
}

// CreateComment creates a new comment
func CreateComment(c *gin.Context) {
	var comment model.Comment
	err := c.ShouldBindJSON(&comment)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if comment.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Content cannot be empty"})
		return
	}

	err = model.CreateComment(&comment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, comment)
}