package model

import (
	"time"

	"github.com/shayaansultan/eduforum/server/database"
)

type Comment struct {
	CommentID   int       `json:"comment_id"`
	Content     string    `json:"content"`
	ThreadID    int       `json:"thread_id"`
	ThreadTitle string    `json:"thread_title"`
	UserID      int       `json:"user_id"`
	Username    string    `json:"username"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	IsEdited    bool      `json:"is_edited"`
}

func GetCommentByID(id int) (*Comment, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM CommentsView WHERE comment_id = ?", id)

	comment := &Comment{}
	var createdAt, updatedAt []byte
	var isEdited int
	err := row.Scan(&comment.CommentID, &comment.Content, &comment.ThreadID, &comment.ThreadTitle,
		&comment.UserID, &comment.Username, &createdAt, &updatedAt, &isEdited)
	if err != nil {
		return nil, err
	}

	comment.IsEdited = (isEdited == 1)

	comment.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
	if err != nil {
		return nil, err
	}

	comment.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
	if err != nil {
		return nil, err
	}

	return comment, nil
}

func GetCommentsByThreadID(id int) ([]*Comment, error) {
	db := database.GetDB()
	rows, err := db.Query("SELECT * FROM CommentsView WHERE thread_id = ? ORDER BY updated_at DESC", id)
	if err != nil {
		return nil, err
	}

	comments := []*Comment{}
	for rows.Next() {
		comment := &Comment{}
		var createdAt, updatedAt []byte
		var isEdited int
		err := rows.Scan(&comment.CommentID, &comment.Content, &comment.ThreadID, &comment.ThreadTitle,
			&comment.UserID, &comment.Username, &createdAt, &updatedAt, &isEdited)
		if err != nil {
			return nil, err
		}

		comment.IsEdited = (isEdited == 1)

		comment.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			return nil, err
		}

		comment.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
		if err != nil {
			return nil, err
		}

		comments = append(comments, comment)
	}

	return comments, nil
}

func CreateComment(comment *Comment) error {
	db := database.GetDB()
	_, err := db.Exec("INSERT INTO Comments(content, thread_id, user_id) VALUES(?, ?, ?)",
		comment.Content, comment.ThreadID, comment.UserID)
	if err != nil {
		return err
	}

	return nil
}

func UpdateComment(id int, content string) error {
	db := database.GetDB()
	_, err := db.Exec("UPDATE Comments SET content = ?, is_edited = 1 WHERE comment_id = ?",
		content, id)
	if err != nil {
		return err
	}

	return nil
}

func DeleteComment(id int) error {
	db := database.GetDB()
	_, err := db.Exec("DELETE FROM Comments WHERE comment_id = ?", id)
	if err != nil {
		return err
	}

	return nil
}
