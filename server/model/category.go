package model

import (
	"errors"

	"github.com/shayaansultan/eduforum/server/database"
)

type Category struct {
	CategoryID int    `json:"category_id"`
	Name       string `json:"name"`
}

func GetCategoryByID(id int) (*Category, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM Categories WHERE category_id = ?", id)

	category := &Category{}
	err := row.Scan(&category.CategoryID, &category.Name)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func GetCategoryByName(name string) (*Category, error) {
	db := database.GetDB()
	row := db.QueryRow("SELECT * FROM Categories WHERE name = ?", name)

	category := &Category{}
	err := row.Scan(&category.CategoryID, &category.Name)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func GetAllCategories() ([]*Category, error) {
	db := database.GetDB()
	rows, err := db.Query("SELECT * FROM Categories ORDER BY category_id ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	categories := make([]*Category, 0)
	for rows.Next() {
		category := new(Category)
		err := rows.Scan(&category.CategoryID, &category.Name)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}

func CreateCategory(category *Category) error {
	db := database.GetDB()
	_, err := db.Exec("INSERT INTO Categories (name) VALUES (?)", category.Name)
	if err != nil {
		return err
	}

	return nil
}

func UpdateCategory(category *Category) error {
	db := database.GetDB()
	result, err := db.Exec("UPDATE Categories SET name = ? WHERE category_id = ?", category.Name, category.CategoryID)
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

func DeleteCategory(id int) error {
	db := database.GetDB()
	result, err := db.Exec("DELETE FROM Categories WHERE category_id = ?", id)
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
