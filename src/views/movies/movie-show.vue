<template>
    <div class="movie-wrapper">
        <div class="movie-name">{{movie.name}}</div>
        <div class="movie-liker" :class="movie.liked ? 'liked' : ''" v-if="ISAUTHENTICATED" @click="changeLike(movie)"></div>
        <img class="movie-image"  :src="require('@/images/movies/' + movie.img)">
        <div class="movie-data">
            <div class="movie-data-item">
                <div class="movie-data-label">В ролях:</div>
                <div class="movie-data-value">{{movie.roles}}</div>
            </div>
            <div class="movie-data-item">
                <div class="movie-data-label">Режиссер:</div>
                <div class="movie-data-value">{{movie.director}}</div>
            </div>
            <div class="movie-data-item">
                <div class="movie-data-label">Год:</div>
                <div class="movie-data-value">{{movie.year}}</div>
            </div>
            <div class="movie-description">{{movie.description}}</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'movie-show',
        props: ['movie'],
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['ISAUTHENTICATED'])
        },
        methods: {
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
            &-image {
                width: 290px;
            }

            &-data {
                padding: 0 10px;
            }

            &-data-label {
                min-width: 70px;
            }

            &-liker {
                width: 40px;
                height: 40px;
            }
        }
    }

    .movie {
        &-wrapper {
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }

        &-name {
            font-size: 1.7rem;
            font-weight: bold;
            border-bottom: 2px solid black;
        }

        &-liker {
            margin-top: 10px;
            width: 70px;
            height: 70px;
            background: url('../../images/icons/heart.png') no-repeat center;
            background-size: contain;
            cursor: pointer;

            &.liked {
                background: url('../../images/icons/heart-full.png') no-repeat center;
                background-size: contain;
            }
        }

        &-image {
            margin-top: 10px;
        }

        &-data {
            width: 100%;
            margin-top: 40px;
            font-size: 1.1rem;

            &-item {
                display: flex;

                &:not(:last-child) {
                    margin-bottom: 7px;
                }
            }

            &-label {
                min-width: 110px;
                display: inline;
                font-style: italic;
                font-weight: bold;

            }

            &-value {
                display: inline;
                text-decoration: underline;
            }
        }

        &-description {
            margin-top: 30px;
            margin-bottom: 30px;
            font-style: italic;
        }
    }
</style>