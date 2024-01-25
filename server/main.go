package main

import (
	"os"

	"github.com/shayaansultan/eduforum/server/database"
	"github.com/shayaansultan/eduforum/server/router"

	"github.com/joho/godotenv"
)

func main() {
	// Initialize the database
	// Load environment variables from .env file
	// if err := godotenv.Load(".env"); err != nil {
	// 	panic("Failed to load environment variables: " + err.Error())
	// }

	_ = godotenv.Load(".env")

	// Get database connection string from environment variables
	dbConnectionString := os.Getenv("DB_CONNECTION_STRING")

	if err := database.InitDB(dbConnectionString); err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	r := router.SetupRouter()

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
