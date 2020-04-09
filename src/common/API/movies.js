import {getData, setData} from './common.js';
import default_movies from '@/data/default_movies.js';

export default {
    getMovies: async (session_hash) => {
        try {
            let movies = await getData('movies', default_movies);
            if (!session_hash) return JSON.stringify({success: true, data: {movies}});
            else {
                let loggings = await getData('loggings', []),
                    finding = loggings.find(el => el.session_hash === session_hash);

                if (!finding) throw new Error('Сессия не найдена!');
                else {
                    let likes = await getData('movie_likes', []),
                        finding_likes = likes.find(el => el.user_id === finding.id),
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
                        });
                    return JSON.stringify({success: true, data: {movies: liked_movies}});
                }
            }
        } catch(err) {
            throw new Error(err)
        }
    },
    changeLike: async (session_hash, movie_id, value) => {
        try {
            if (!session_hash) return JSON.stringify({success: false, message: 'Пользователь не авторизован!'});
            let loggings = await getData('loggings', []),
                finding = loggings.find(el => el.session_hash === session_hash);

            if (!finding) throw new Error('Сессия не найдена!');
            else {
                let likes = await getData('movie_likes', []),
                    finding_likes = likes.find(el => el.user_id === finding.id);

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
                await setData('movie_likes', likes);
                return JSON.stringify({success: true, data: {movie: {id: movie_id, liked: value}}});
            }
        } catch(err) {
             throw new Error(err)
        }
    }
}