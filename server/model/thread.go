package model

import (
	"errors"
	"time"

	"github.com/shayaansultan/eduforum/server/database"
)

type Thread struct {
	ThreadID  int       `json:"thread_id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	UserID    int       `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func GetThreadByID(id int) (*Thread, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM Threads WHERE thread_id = ?", id)

	thread := &Thread{}
	var createdAt, updatedAt []byte
	err := row.Scan(&thread.ThreadID, &thread.Title, &thread.Content, &thread.UserID, &createdAt, &updatedAt)
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

func GetAllThreads() ([]*Thread, error) {
	db := database.GetDB()
	rows, err := db.Query("SELECT * FROM Threads")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	threads := make([]*Thread, 0)
	for rows.Next() {
		thread := &Thread{}
		var createdAt, updatedAt []byte
		if err := rows.Scan(&thread.ThreadID, &thread.Title, &thread.Content, &thread.UserID, &createdAt, &updatedAt); err != nil {
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
		threads = append(threads, thread)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return threads, nil
}

func CreateThread(thread *Thread) error {
	db := database.GetDB()
	_, err := db.Exec("INSERT INTO Threads (title, content, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
		thread.Title, thread.Content, thread.UserID, time.Now(), time.Now())
	return err
}

func UpdateThread(thread *Thread) error {
	db := database.GetDB()
	result, err := db.Exec("UPDATE Threads SET title = ?, content = ? WHERE thread_id = ?",
		thread.Title, thread.Content, thread.ThreadID)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("no changes made")
	}

	return nil
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
		return errors.New("no thread found with the given id")
	}

	return nil
}
