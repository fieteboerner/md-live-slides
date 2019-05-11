import axios from 'axios';

export default class Presentation {
    static async list() {
        const { data } = await axios.get('/api/presentation');

        return data;
    }

    static async get(id) {
        const { data } = await axios.get(`/api/presentation/${id}`);

        return data;
    }

    static async create() {
        const { data } = await axios.post('/api/presentation');

        return data;
    }

    static async update(id, attributes) {
        const { data } = await axios.put(`/api/presentation/${id}`, attributes);

        return data;
    }
}