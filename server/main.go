package main

import (
	"example/eduforum-api/database"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()

	// Initialize the database
	// Load environment variables from .env file
	if err := godotenv.Load("../.env"); err != nil {
		panic("Failed to load environment variables: " + err.Error())
	}

	// Get database connection string from environment variables
	dbConnectionString := os.Getenv("DB_CONNECTION_STRING")

	if err := database.InitDB(dbConnectionString); err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

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

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
