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
		err := database.PingDB()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "DB not connected",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"message": "DB connected",
			})
		}
	})

	return r
}
