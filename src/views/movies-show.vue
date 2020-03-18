<template>
    <div class="movies-wrapper">
        <div class="header-common">{{type === 'likes' ? 'Понравившиеся' : 'Все фильмы'}}</div>
        <div class="movies-container" v-if="paged_movies.length">
            <div class="movie" v-for="(movie, i) in paged_movies" :key="i">
                <router-link :to="{name: 'movie-show', params: {id: movie.id}}">
                    <img class="movie-image" :src="require('@/images/movies/' + movie.img)">
                </router-link>
                <router-link class="movie-name" :to="{name: 'movie-show', params: {id: movie.id}}">{{movie.name}} ({{movie.year}})</router-link>
                <div class="movie-liker" :class="movie.liked ? 'liked' : ''" v-if="ISAUTHETICATED" @click="changeLike(movie)"></div>
            </div>
        </div>
        <div v-else>Фильмы отсутствуют</div>
        <pagination :elements_length="movies.length" :page_size="page_size" @pageChanged="pageChanged"></pagination>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Pagination from "../components/pagination";

    export default {
        name: 'movies-show',
        props: ['type'],
        components: {Pagination},
        data() {
            return  {
                page_size: 9,
                current_page: 1
            }
        },
        computed: {
            ...mapGetters(['MOVIES', 'LIKED_MOVIES', 'ISAUTHETICATED']),
            movies() {
                if (this.type === 'all') return this.MOVIES;
                return this.LIKED_MOVIES;
            },
            paged_movies() {
                return this.movies.slice().splice((this.current_page - 1)*this.page_size, this.page_size);
            }
        },
        methods: {
            pageChanged(i) {
                this.current_page = i;
            },
            changeLike(movie) {
                let session_hash = this.$cookies.get('vue_example_user');
                this.$store.dispatch('CHANGE_LIKE', {session_hash, movie})
                .catch(({type, message}) => {
                    if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
                    console.error(message);
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .mobile {
        .movie {
            width: 290px;
        }

        .movie-image {
            width: 290px;
            height: 162px;
        }
    }

    .movies-container {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .movie {
        width: 374px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 10px 0px;
    }

    .movie-name {
        margin-top: 3px;
        font-size: 1.2rem;
        font-style: italic;
        max-width: 100%;
        text-align: center;
        color: black;
        text-decoration: underline;
    }

    .movie-liker {
        margin-top: 3px;
        width: 50px;
        height: 50px;
        background: url('../images/icons/heart.png') no-repeat center;
        background-size: contain;
        cursor: pointer;

        &.liked {
            background: url('../images/icons/heart-full.png') no-repeat center;
            background-size: contain;
        }
    }

    .movie-image {
        width: 374px;
        height: 211px;
    }

    router-link.wrapper {
        position: relative;
    }
</style>