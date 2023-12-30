package model

import (
	"time"

	"github.com/shayaansultan/eduforum/server/database"
)

type Thread struct {
	ThreadID     int       `json:"thread_id"`
	Title        string    `json:"title"`
	Content      string    `json:"content"`
	UserID       int       `json:"user_id"`
	Username     string    `json:"username"`
	CategoryID   int       `json:"category_id"`
	CategoryName string    `json:"category_name"`
	CommentCount int       `json:"comment_count"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func GetThreadByID(id int) (*Thread, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM ThreadsView WHERE thread_id = ?", id)

	thread := &Thread{}
	var createdAt, updatedAt []byte
	err := row.Scan(&thread.ThreadID, &thread.Title, &thread.Content, &thread.UserID, &thread.Username, &thread.CategoryID, &thread.CategoryName, &thread.CommentCount, &createdAt, &updatedAt)
	if err != nil {
		return nil, err
	}

	thread.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
	if err != nil {
		return nil, err
	}

	thread.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
	if err != nil {
		return nil, err
	}

	return thread, nil
}
