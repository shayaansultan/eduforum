package model

import (
	"errors"
	"time"

	"github.com/shayaansultan/eduforum/server/database"
)

type User struct {
	UserID    string    `json:"user_id"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Email     string    `json:"email"`
}

func GetUserByID(id string) (*User, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM Users WHERE user_id = ?", id)

	user := &User{}
	var createdAt, updatedAt []byte
	err := row.Scan(&user.UserID, &user.Username, &createdAt, &updatedAt, &user.Email)
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

func GetUserByUsername(username string) (*User, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM Users WHERE username = ?", username)

	user := &User{}
	var createdAt, updatedAt []byte
	err := row.Scan(&user.UserID, &user.Username, &createdAt, &updatedAt, &user.Email)
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

func GetAllUsers() ([]*User, error) {
	db := database.GetDB()
	rows, err := db.Query("SELECT * FROM Users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]*User, 0)
	for rows.Next() {
		user := &User{}
		var createdAt, updatedAt []byte
		if err := rows.Scan(&user.UserID, &user.Username, &createdAt, &updatedAt, &user.Email); err != nil {
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
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func UpdateUser(user *User) error {
	db := database.GetDB()
	result, err := db.Exec("UPDATE Users SET username = ? WHERE user_id = ?", user.Username, user.UserID)
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

func CreateUser(user *User) error {
	db := database.GetDB()
	_, err := db.Exec("INSERT INTO Users (user_id, username, created_at, updated_at, email) VALUES (?, ?, ?, ?, ?)", user.UserID, user.Username, time.Now(), time.Now(), user.Email)
	return err
}

func DeleteUser(id int) error {
	db := database.GetDB()
	result, err := db.Exec("DELETE FROM Users WHERE user_id = ?", id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("no user found with the given id")
	}

	return nil
}

func IsUsernameTaken(username string) (bool, error) {
	db := database.GetDB()
	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM Users WHERE username=?)`
	err := db.QueryRow(query, username).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}
