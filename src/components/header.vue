<template>
    <div class="block-header-container">
        <router-link :to="{name: 'home'}" class="logo-container">
            <div class="logo">Фильмы</div>
            <div class="logo-text">Лучшие</div>
        </router-link>
        <div class="container" v-if="ISAUTHETICATED">
			<router-link v-if="ISADMIN" :to="{name: 'post-editor', params: {id: 0}}">+</router-link>
			<router-link v-if="ISADMIN" :to="{name: 'posts-editor'}">Р</router-link>
			<div class="profile-img"></div>
			<div class="profile-username">{{ USERNAME }}</div>
			<div class="profile-label">Корзина</div>
			<div class="profile-label" @click="exitUser">Выйти</div>
        </div>
        <div class="container" v-else>
             <router-link :to="{name: 'auth'}" class="profile-label">Войти</router-link>
             <router-link :to="{name: 'registr'}" class="profile-label">Зарегистрироваться</router-link>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
    name: 'block-header',
    props: [],
    directives: {},
    mixins: [],
    components: {},
    data() {
        return {
           
        }
    },
    computed: {
        ...mapGetters(['USERNAME', 'ISAUTHETICATED', 'ISADMIN'])
    },
    methods: { 
        exitUser() {
			let session_hash = (this.$cookies.get('vue_example_user')) ? this.$cookies.get('vue_example_user') : '';
            this.$store.dispatch('EXIT_USER', session_hash)
            .then(() => {
				this.$store.commit('SET_ALL_POSTS', []);
				this.$cookies.remove('vue_example_user');
                if (this.$router.currentRoute.name !== 'home') this.$router.push({name: 'home'});
            })
			.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: message, type: 'error'});
				console.error(message);
			})
        }
    }
}

</script>

<style scoped lang="scss">

    .block-header-container {
        background: black;
        height: 55px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .profile-img {
        width: 36px;
        height: 36px;
        background: url('../images/icons/profile_face.svg') no-repeat center;
        background-size: contain;
    }

    .logo {
        font-size: 2rem;
        line-height: 90%;
    }

    .logo-text {
        text-align: center;
    }

    .container {
        display: flex;
        align-items: center;
    }
</style>