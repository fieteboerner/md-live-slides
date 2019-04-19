import axios from 'axios';

export default class Presentation {
    static async list() {
        const { data } = await axios.get('/api/presentations');

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
}