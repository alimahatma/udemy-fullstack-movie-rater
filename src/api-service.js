// const TOKEN = '19b78f4a95f267e705e9df1adfd95ca465ea1a42';

export class API {
    static loginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

    static registerUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }

    static getMovie(token) {
        return fetch('http://127.0.0.1:8000/api/movies/', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then( resp => resp.json())
    }

    static updateMovie(mov_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then( resp => resp.json())
    }

    static createMovie(body, token) {
        return fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body, token)
        }).then( resp => resp.json())
    }

    static deleteMovie(mov_id, token) {
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'applications/json',
                'Authorization': `Token ${token}`
            }
        })
    }
}



