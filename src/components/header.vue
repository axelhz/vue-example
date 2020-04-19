<template>
    <div class="header-container">
        <div class="wrapper-common horizontal">
            <router-link :to="{name: 'home'}" class="logo-container">
                <div class="logo">Фильмы</div>
                <div class="logo-text">Лучшие</div>
            </router-link>
            <div class="profile-container" v-if="ISAUTHENTICATED">
                <router-link v-if="ISADMIN" :to="{name: 'post-editor', params: {id: 0}}" class="profile-label bigger">+</router-link>
                <router-link v-if="ISADMIN" :to="{name: 'posts-editor'}" class="profile-list"></router-link>
                <div class="profile-img"></div>
                <div class="profile-username">{{ USERNAME }}</div>
                <router-link class="profile-like" :to="{name: 'movies-likes'}"></router-link>
            </div>
            <div class="profile-container" v-else>
                <router-link :to="{name: 'auth'}" class="profile-label">Войти</router-link>
                <router-link :to="{name: 'registr'}" class="profile-label">Зарегистрироваться</router-link>
            </div>
            <div class="profile-label clickable" @click="exitUser" v-if="ISAUTHENTICATED">Выйти</div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex';
import device_detection from "../common/device_detection";

export default {
    name: 'block-header',
    props: [],
    directives: {},
    mixins: [device_detection],
    components: {},
    data() {
        return {
           
        }
    },
    computed: {
        ...mapGetters(['USERNAME', 'ISAUTHENTICATED', 'ISADMIN'])
    },
    methods: { 
        exitUser() {
            const session_hash = (this.$cookies.get('vue_example_user')) ? this.$cookies.get('vue_example_user') : '';
            this.$store.dispatch('EXIT_USER', session_hash)
            .then(() => {
                this.$store.commit('SET_ALL_POSTS', []);
				this.$cookies.remove('vue_example_user');
				if (this.$router.currentRoute.name !== 'home') this.$router.push({name: 'home'});
				return this.$store.dispatch('GET_MOVIES')
            })
			.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
				console.error(message);
			})
        }
    }
}

</script>

<style scoped lang="scss">
    .mobile {
         .profile-img {
            width: 25px;
            height: 25px;
        }

        .profile-list {
            width: 20px;
            height: 20px;
        }
    }

    .header-container {
        background: black;
        height: 55px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .logo {
        font-size: 1.8rem;
        line-height: 90%;

        &-text {
            text-align: center;
        }
    }

    .profile {
        &-container {
            display: flex;
            align-items: center;
        }

        &-username {
            margin: 0px 3px;
            font-size: 1.2rem;
            border-bottom: 2px solid #f60;
        }

        &-label {
            font-size: 1.1rem;
            margin-left: 4px;

            &.bigger {
                font-size: 1.6rem;
            }

            &.clickable {
                cursor: pointer;
            }
        }

        &-img {
            margin-right: 3px;
            width: 36px;
            height: 36px;
            background: url('../images/icons/profile_face.svg') no-repeat center;
            background-size: contain;
        }

        &-list {
            margin: 0px 5px;
            width: 27px;
            height: 27px;
            background: url('../images/icons/list.png') no-repeat center;
            background-size: contain;
        }

        &-like {
            width: 35px;
            height: 35px;
            background: url('../images/icons/heart-full.png') no-repeat center;
            background-size: contain;
        }
    }
</style>