package controller

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/shayaansultan/eduforum/server/model"
)

func GetUser(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil || id <= 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    user, err := model.GetUserByID(id)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
        }
        return
    }

    c.JSON(http.StatusOK, user)
}

func GetUserByUsername(c *gin.Context) {
    username := c.Param("username")
    if username == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid username"})
        return
    }

    user, err := model.GetUserByUsername(username)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
        }
        return
    }

    c.JSON(http.StatusOK, user)
}

func GetAllUsers(c *gin.Context) {
    users, err := model.GetAllUsers()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching users"})
        return
    }

    c.JSON(http.StatusOK, users)
}

func UpdateUser(c *gin.Context) {
    var user model.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if user.UserID == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
        return
    }

    if user.Username == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
        return
    }

    if err := model.UpdateUser(&user); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, user)
}