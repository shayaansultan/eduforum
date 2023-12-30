package model

import (
	"time"

	"github.com/shayaansultan/eduforum/server/database"
)

type User struct {
	UserID       int
	Username     string
	PasswordHash string
	Email        string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func GetUserByID(id int) (*User, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM Users WHERE user_id = ?", id)

	user := &User{}
	var createdAt, updatedAt []byte
	err := row.Scan(&user.UserID, &user.Username, &user.PasswordHash, &user.Email, &createdAt, &updatedAt)
	if err != nil {
		return nil, err
	}

	user.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
	if err != nil {
		return nil, err
	}

	user.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
	if err != nil {
		return nil, err
	}

	return user, nil
}
