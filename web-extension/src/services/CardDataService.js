//import http from "@/http-common";
import NoteDataService from "./NoteDataService";
var ebisu = require('ebisu-js');

function cardRecall(card, currentDate) {
    let last_reviewed = new Date(card.last_reviewed);
    let elapsedHours = Math.floor(Math.abs(currentDate - last_reviewed) / 36e5);
    console.log(card.model);
    console.log(card);
    return ebisu.predictRecall(card.recall_model, elapsedHours, false); // log-probability returned, is quicker
}

class CardDataService {
    getLowestRecall(amount) {
        return NoteDataService.getAll()
            .then(response => {
                let notes = response.data;
                let cards = (notes.map((note) => 'cards' in note ? note.cards : [])).flat(1).filter( Object );
                let cardsSorted = cards.sort( (a, b) => {
                    let now = Date.now();
                    return cardRecall(a, now) - cardRecall(b, now);
                });
                return cardsSorted.slice(0,amount);
                //return ['A', amount, notes, notes.map];
            })
            .catch(e => {
                console.log(e);
            });
        //(notes.map((note) => 'cards' in note ? note.cards : [])).flat(1).filter( Object );
        //return [];
    }
    /*
    getAll() {
        //return http.get("/notes/");
    }
    get(id) {
        //return http.get(`/notes/${id}/`);
    }
    create(note) {
        //return http.post(`/notes/`, note);
    }
    update(id, note) {
        //return http.put(`/notes/${id}`, note);
    }
    delete(id) {
        //return http.delete(`/notes/${id}`);
    }
    */
}
export default new CardDataService();
