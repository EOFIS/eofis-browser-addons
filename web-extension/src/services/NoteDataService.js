import http from "@/http-common";

class NoteDataService {
    getAll() {
        return http.get("/notes/");
    }
    get(id) {
        return http.get(`/notes/${id}/`);
    }
    create(note) {
        return http.post(`/notes/`, note);
    }
    createAuto(mode, method, data) {
        return http.post(`/notes/?mode=${mode}&method=${method}`, data);
    }
    update(id, note) {
        return http.put(`/notes/${id}`, note);
    }
    delete(id) {
        return http.delete(`/notes/${id}`);
    }
}
export default new NoteDataService();
