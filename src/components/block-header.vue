<template>
    <div class="block-header-container">
        <router-link :to="{name: 'home'}" class="logo-container">
            <div class="logo">Фильмы</div>
            <div class="logo-text">Лучшие</div>
        </router-link>
        <div class="container" v-if="ISAUTHETICATED">
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
        ...mapGetters(['USERNAME']),
		...mapGetters(['ISAUTHETICATED']),
		...mapGetters(['ISADMIN'])
    },
    methods: { 
        exitUser() {
            this.$store.dispatch('EXIT_USER')
            .then(() => {
                if (this.$router.currentRoute.name !== 'home') this.$router.push({name: 'home'});
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