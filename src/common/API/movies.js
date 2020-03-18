import {getData, setData} from './common.js';
import default_movies from '@/data/default_movies.js';

export default {
    getMovies: (session_hash) => {
        return new Promise((resolve, reject) => {
            getData('movies', default_movies)
            .then(movies => {
                if (!session_hash) resolve(JSON.stringify({success: true, data: {movies}}));
                else {
                    getData('loggings', [])
                    .then(loggings => {
                        let finding = loggings.find(el => el.session_hash === session_hash);

                        if (!finding) throw new Error('Сессия не найдена!');
                        else {
                            getData('movie_likes', [])
                            .then(likes => {
                                let finding_likes = likes.find(el => el.user_id === finding.id),
                                    liked_movies = movies.map(el => {
                                        if (!finding_likes) {
                                            el.liked = false;
                                            return el;
                                        }
                                        if (finding_likes.likes.includes(el.id)) {
                                            el.liked = true;
                                            return el;
                                        }
                                        el.liked = false;
                                        return el;
                                    })
                                resolve(JSON.stringify({success: true, data: {movies: liked_movies}}))
                            })
                            .catch(error => reject(error))
                        }
                    })
                    .catch(error => reject(error))

                }
            })
            .catch(error => reject(error))
        })
    },
    changeLike: (session_hash, movie_id, value) => {
        return new Promise((resolve, reject) => {
            if (!session_hash) resolve(JSON.stringify({success: false, message: 'Пользователь не авторизован!'}));
            getData('loggings', [])
            .then(loggings => {
                let finding = loggings.find(el => el.session_hash === session_hash);

                if (!finding) throw new Error('Сессия не найдена!');
                else {
                    getData('movie_likes', [])
                    .then(likes => {
                        let finding_likes = likes.find(el => el.user_id === finding.id);

                        if (!finding_likes) {
                            finding_likes = {
                                user_id: finding.id,
                                likes: []
                            };
                            likes.push(finding_likes)
                        }
                        if (value) finding_likes.likes.push(movie_id);
                        else {
                            finding_likes.likes = finding_likes.likes.filter(el => el !== movie_id)
                        }
                        return setData('movie_likes', likes)
                    })
                    .then(() => {
                        resolve(JSON.stringify({success: true, data: {movie: {id: movie_id, liked: value}}}))
                    })
                    .catch(error => reject(error))
                }
            })
            .catch(error => reject(error))
        })
    }
}