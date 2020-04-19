<template>
    <div class="local-wrapper">
        <div class="header-common" v-if="ISADMIN">{{getHeader(movie)}}</div>
        <!-- <div v-if="ISADMIN" class="options-wrapper">
            <router-link :to="{name: 'movie-show'}" class="link-option">Просмотр</router-link>
        </div> -->
        <router-view :movie="movie"></router-view>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: 'movie-home',
        mixins: [],
        data() {
            return {
                movie: null
            }
        },
        computed: {
            ...mapGetters(['ISADMIN', 'MOVIES'])
        },
        watch: {
            '$route.params.id'(id) {
                this.checkMovie(+id);
            }
        },
        created() {
            this.checkMovie(+this.$route.params.id);
        },
        methods: {
            checkMovie(id) {
                if (isNaN(id)) {
                    this.$router.replace({name: 'movie-show', params: {id: this.MOVIES[0].id}});
                    return;
                } else if (id === 0) {
                    this.$router.replace({name: 'movie-show', params: {id: this.MOVIES[0].id}});
                } else {
                    this.movie = null;
                    this.MOVIES.forEach(el => {
                        if (el.id === id) {
                            this.movie = el;
                        }
                    });

                    if (!this.movie) this.$router.replace({name: 'movie-show', params: {id: this.MOVIES[0].id}});
                }
            },
            getHeader(movie) {
                if (!movie) return 'Неопределенный фильм';
                else {
                    if (movie.id === 0) {
                        return 'Новый пост'
                    }
                    return 'Фильм №' + movie.id;
                }
            }
        }
    }

</script>

<style scoped lang="scss">
    .local-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black;
    }
</style>