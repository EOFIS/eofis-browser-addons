//import http from "@/http-common";
import NoteDataService from "./NoteDataService";
var ebisu = require('ebisu-js');

function cardRecall(card, currentDate) {
    let last_reviewed = new Date(card.last_reviewed);
    let elapsedHours = Math.floor(Math.abs(currentDate - last_reviewed) / 36e5);
    return ebisu.predictRecall(card.recall_model, elapsedHours, false); // log-probability returned, is quicker
}

class CardDataService {
    getLowestRecall(amount) {
        return NoteDataService.getAll()
            .then(response => {
                let notes = response.data.filter(note => note.cards != undefined);
                // Add tags and source info to each card
                notes.forEach( n => {
                    n.cards.forEach( c => {
                        c.tags = n.tags;
                        c.source = n.source;
                    })});
                let cards = notes.map((note) => note.cards).flat(1);
                let cardsSorted = cards.sort( (a, b) => {
                    let now = Date.now();
                    return cardRecall(a, now) - cardRecall(b, now);
                });
                return cardsSorted.slice(0,amount);
            })
            .catch(e => {
                console.log(e);
            });
    }
    getAll() {
        return NoteDataService.getAll()
            .then( response => {
                let notes = response.data;
                let cards = (notes.map((note) => 'cards' in note ? note.cards : [])).flat(1).filter( Object );
                return cards;
            });

    }
    /*
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
