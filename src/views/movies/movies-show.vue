<template>
    <div class="movies-wrapper">
        <div class="header-common">{{type === 'likes' ? 'Понравившиеся' : 'Все фильмы'}}</div>
        <div class="filters-container">
            <div class="filter-wrapper">
                <input type="text" class="filter-common" placeholder="Наименование" v-model="filtered_name">
            </div>
            <div class="filters-wrapper">
                <div class="filter-wrapper">
                    <select-box :values="YEARS" :input_class="'select-common'"
                                :placeholder="'Мин.год'" @selectValue="changeMinYear"></select-box>
                </div>
                <div class="filter-wrapper">
                    <select-box :values="YEARS.slice().reverse()" :input_class="'select-common'"
                                :placeholder="'Макс.год'" @selectValue="changeMaxYear"></select-box>
                </div>
            </div>
        </div>
        <div class="movies-container" v-if="paged_movies.length">
            <div class="movie" v-for="(movie, i) in paged_movies" :key="i">
                <router-link :to="{name: 'movie-show', params: {id: movie.id}}">
                    <img class="movie-image" :src="require('@/images/movies/' + movie.img)">
                </router-link>
                <router-link class="movie-name" :to="{name: 'movie-show', params: {id: movie.id}}">{{movie.name}} ({{movie.year}})</router-link>
                <div class="movie-liker" :class="movie.liked ? 'liked' : ''" v-if="ISAUTHENTICATED" @click="changeLike(movie)"></div>
            </div>
        </div>
        <div v-else style="margin-top: 20px;">Фильмы отсутствуют</div>
        <pagination :elements_length="filtered_movies.length" :page_size="page_size" @pageChanged="pageChanged"></pagination>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Pagination from '@/components/pagination';
    import SelectBox from '@/components/select-box';

    export default {
        name: 'movies-show',
        props: ['type'],
        components: {Pagination, SelectBox},
        data() {
            return  {
                page_size: 9,
                current_page: 1,
                filtered_name: '',
                filtered_year_min: null,
                filtered_year_max: null
            }
        },
        computed: {
            ...mapGetters(['MOVIES', 'LIKED_MOVIES', 'ISAUTHENTICATED', 'YEARS']),
            movies() {
                return (this.type === 'all') ? this.MOVIES : this.LIKED_MOVIES;
            },
            filtered_movies() {
                let movies = this.movies;
                if (this.filtered_name) {
                    movies = movies.filter(el => el.name.toLowerCase().includes(this.filtered_name.toLowerCase()))
                }
                if (this.filtered_year_min || this.filtered_year_max) {
                    movies = movies.filter(el => {
                        if (this.filtered_year_min && this.filtered_year_max) return el.year >= this.filtered_year_min &&  el.year <= this.filtered_year_max;
                        else if (this.filtered_year_max) return el.year <= this.filtered_year_max
                        else return el.year >= this.filtered_year_min;
                    })
                }
                return movies;
            },
            paged_movies() {
                return this.filtered_movies.slice().splice((this.current_page - 1)*this.page_size, this.page_size);
            }
        },
        methods: {
            pageChanged(i) {
                this.current_page = i;
            },
            changeLike(movie) {
                const session_hash = this.$cookies.get('vue_example_user');
                this.$store.dispatch('CHANGE_LIKE', {session_hash, movie})
                .catch(({type, message}) => {
                    if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
                    console.error(message);
                });
            },
            changeMinYear(year) {
                if (this.filtered_year_min === year) this.filtered_year_min = null;
                else this.filtered_year_min = year;
            },
            changeMaxYear(year) {
                if (this.filtered_year_max === year) this.filtered_year_max = null;
                else this.filtered_year_max = year;
            }
        }
    }
</script>

<style scoped lang="scss">
    .mobile {
        .movie {
            width: 290px;

            &-image {
                width: 290px;
                height: 162px;
            }
        }

        .filters-wrapper {
            .filter-wrapper {
                width: 80px;

                &:first-child {
                    margin-right: 7px;
                }
            }
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


        &-name {
            margin-top: 3px;
            font-size: 1.2rem;
            font-style: italic;
            max-width: 100%;
            text-align: center;
            color: black;
            text-decoration: underline;
        }

        &-liker {
            margin-top: 3px;
            width: 50px;
            height: 50px;
            background: url('../../images/icons/heart.png') no-repeat center;
            background-size: contain;
            cursor: pointer;

            &.liked {
                background: url('../../images/icons/heart-full.png') no-repeat center;
                background-size: contain;
            }
        }

        &-image {
            width: 374px;
            height: 211px;
        }
    }

    .filter-wrapper {
        margin-top: 10px;
    }

    .filters-wrapper {
        display: flex;

        .filter-wrapper {
            width: 115px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }

</style>