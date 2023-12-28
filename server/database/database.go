package database

import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitDB(dataSourceName string) error {
    var err error
    db, err = sql.Open("mysql", dataSourceName)
    if err != nil {
        return err
    }
    if err = db.Ping(); err != nil {
        return err
    }
    return nil
}

func GetDB() *sql.DB {
    return db
}