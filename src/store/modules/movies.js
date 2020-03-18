import movies_API from '@/common/API/movies.js';

export default {
    state: {
        movies: []
    },
    getters: {
        MOVIES: (state) => {
            return state.movies;
        },
        LIKED_MOVIES: (state, getters) => {
            return getters.MOVIES.filter(el => el.liked);
        }
    },
    mutations: {
        SET_MOVIES: (state, movies) => {
            state.movies = movies;
        },
        UPDATE_MOVIE: (state, movie) => {
            state.movies = state.movies.map(el => {
                if (el.id !== movie.id) return el;
                return Object.assign(el, movie);
            })
        }
    },
    actions: {
        GET_MOVIES: (state, session_hash) => {
            return new Promise((resolve, reject) => {
                movies_API.getMovies(session_hash)
                .then(response => JSON.parse(response))
                .then(result => {
                    if (!result.success) {
                        reject({type: 'user', message: result.message});
                    } else {
                        state.commit('SET_MOVIES', result.data.movies);
                        resolve();
                    }
                })
                .catch(({message}) => {
                    reject({type: 'system', message})
                })
            })
        },
        CHANGE_LIKE: (state, {session_hash, movie}) => {
           return new Promise((resolve, reject) => {
               movies_API.changeLike(session_hash, movie.id, !movie.liked)
               .then(response => JSON.parse(response))
               .then(result => {
                   if (!result.success) {
                       reject({type: 'user', message: result.message});
                   } else {
                       state.commit('UPDATE_MOVIE', result.data.movie);
                       resolve();
                   }
               })
               .catch(({message}) => {
                   reject({type: 'system', message})
               })
           })
        }
    }
}