package usersdao

import (
	"../../db"
)

type Users struct {
	ID int `json:"id"`
	Name string `json:"name"`
}

func FetchIndex() []Users {
	db := db.Connect()
	defer db.Close()

	rows, err := db.Query("select * FROM users")
	if err != nil {
		panic(err.Error())
	}

	userArgs := make([]Users, 0)
	for rows.Next() {
		var user Users
		err = rows.Scan(&user.ID, &user.Name)
		if err != nil {
			panic(err.Error())
		}
		userArgs = append(userArgs, user)
	}
	return userArgs
}