package main
import (
	"encoding/json"
	"net/http"
	"log"
	"github.com/gorilla/mux"
	usersdao "./pkg/dao/users"
)

type User struct {
	ID int
	Name string
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/users", showUsersIndex)
	log.Fatal(http.ListenAndServe(":8080", r))
}

func showUsersIndex(w http.ResponseWriter, r *http.Request) {
	user := usersdao.FetchIndex()
	bytes, err := json.Marshal(user)
	if err != nil {
		log.Fatal(err)
	}
	w.Write([]byte(string(bytes)))
}
