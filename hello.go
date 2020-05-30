package main
import (
	"database/sql"
	"fmt"
	"log"
	"os"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type User struct {
	ID int
	Name string
}

func main() {
	err := godotenv.Load()
	if err != nil{
		log.Fatal(err)
	}
	db, err := sql.Open("mysql", os.Getenv("DB_ROLE") + ":" + os.Getenv("DB_PASSWORD") + "@/" + os.Getenv("DB_NAME"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	id := 3
	var name string
	err = db.QueryRow("SELECT name from users WHERE id = ?", id).Scan(&name)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(name)
}
