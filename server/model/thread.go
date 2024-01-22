package model

import (
	"errors"
	"time"

	"github.com/shayaansultan/eduforum/server/database"
)

type Thread struct {
	ThreadID     int       `json:"thread_id"`
	Title        string    `json:"title"`
	Content      string    `json:"content"`
	UserID       int       `json:"user_id"`
	Username     string    `json:"username"`
	UserEmail    string    `json:"user_email"`
	CategoryID   int       `json:"category_id"`
	CategoryName string    `json:"category_name"`
	CommentCount int       `json:"comment_count"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	IsEdited     bool      `json:"is_edited"`
}

func GetThreadByID(id int) (*Thread, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM ThreadsView WHERE thread_id = ?", id)

	thread := &Thread{}
	var createdAt, updatedAt []byte
	var isEdited int
	err := row.Scan(&thread.ThreadID, &thread.Title, &thread.Content, &thread.UserID, &thread.Username, &thread.UserEmail,
		&thread.CategoryID, &thread.CategoryName, &thread.CommentCount, &createdAt, &updatedAt, &isEdited)
	if err != nil {
		return nil, err
	}

	thread.IsEdited = (isEdited == 1)

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

func GetAllThreads() ([]*Thread, error) {
	db := database.GetDB()
	rows, err := db.Query("SELECT * FROM ThreadsView")
	if err != nil {
		return nil, err
	}

	threads := make([]*Thread, 0)
	for rows.Next() {
		thread := &Thread{}
		var createdAt, updatedAt []byte
		var isEdited int
		err := rows.Scan(&thread.ThreadID, &thread.Title, &thread.Content, &thread.UserID, &thread.Username, &thread.UserEmail,
			&thread.CategoryID, &thread.CategoryName, &thread.CommentCount, &createdAt, &updatedAt, &isEdited)
		if err != nil {
			return nil, err
		}

		thread.IsEdited = (isEdited == 1)

		thread.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			return nil, err
		}

		thread.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
		if err != nil {
			return nil, err
		}

		threads = append(threads, thread)
	}

	return threads, nil
}

func CreateThread(title string, content string, userID int, categoryID int) (int, error) {
	db := database.GetDB()
	_, err := db.Exec("INSERT INTO Threads (title, content, user_id, category_id) VALUES (?, ?, ?, ?)", title, content, userID, categoryID)
	if err != nil {
		return -1, err
	}
	row := db.QueryRow("SELECT LAST_INSERT_ID()")
	var id int
	err = row.Scan(&id)
	if err != nil {
		return -1, err
	}

	return id, nil
}

func DeleteThread(id int) error {
	db := database.GetDB()
	result, err := db.Exec("DELETE FROM Threads WHERE thread_id = ?", id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("Thread not found")
	}

	return nil
}

func UpdateThread(id int, title string, content string) error {
	db := database.GetDB()
	result, err := db.Exec("UPDATE Threads SET title = ?, content = ? WHERE thread_id = ?", title, content, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("Thread not found")
	}

	return nil
}
