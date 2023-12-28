package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shayaansultan/eduforum/server/database"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// Ping DB
	r.GET("/pingdb", func(c *gin.Context) {
		db := database.GetDB()
		if db == nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to get database instance",
			})
			return
		}

		err := db.Ping()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to ping database: " + err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Successfully connected to the database",
		})
	})

	return r
}
