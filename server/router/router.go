package router

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/shayaansultan/eduforum/server/controller"
	"github.com/shayaansultan/eduforum/server/database"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Add the cors middleware to the router
	r.Use(cors.Default())

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

	// User routes
	r.GET("/users/:id", controller.GetUser)
	r.GET("/users", controller.GetAllUsers)
	r.GET("/users/username/:username", controller.GetUserByUsername)
	r.PUT("/users/:id", controller.UpdateUser)
	r.POST("/users", controller.CreateUser)
	r.DELETE("/users/:id", controller.DeleteUser)
	r.GET("/users/:id/check", controller.CheckUsernameExists)

	// Category routes
	r.GET("/categories/:id", controller.GetCategory)
	r.GET("/categories", controller.GetAllCategories)
	r.POST("/categories", controller.CreateCategory)
	r.PUT("/categories/:id", controller.UpdateCategory)
	r.DELETE("/categories/:id", controller.DeleteCategory)

	// Thread routes
	r.GET("/threads/:id", controller.GetThreadByID)
	r.GET("/threads", controller.GetAllThreads)
	r.POST("/threads", controller.CreateThread)
	r.PUT("/threads/:id", controller.UpdateThread)
	r.DELETE("/threads/:id", controller.DeleteThread)
	// Get all threads in a category
	r.GET("/checkusername/:username", controller.CheckUsernameExists)

	// Comment routes
	r.GET("/comments/:id", controller.GetCommentByID)
	r.POST("/comments", controller.CreateComment)
	r.PUT("/comments/:id", controller.UpdateComment)
	r.DELETE("/comments/:id", controller.DeleteComment)

	return r
}
