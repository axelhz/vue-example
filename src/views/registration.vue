<template>
	<div class="wrapper-common">
		<div class="header-common">Регистрация</div>
		<ul class="errors-common">
			<li class="error-common" v-for="(error, i) in errors" :key="i">{{ error }}</li>
		</ul>
		<form @submit.prevent="submitForm(username, password)" class="form-common">
			<fieldset class="fieldset-common">
				<input type="text" placeholder="Логин" v-model="username" class="input-common"/>
			</fieldset>
			<fieldset class="fieldset-common">
				<input type="password" placeholder="Пароль" v-model="password" class="input-common"/>
			</fieldset>
			<fieldset class="fieldset-common">
				<input type="password" placeholder="Повторите пароль" v-model="repeat_password" class="input-common"/>
			</fieldset>
			<button class="button-common">Войти</button>
		</form>
		<router-link :to="{name: 'auth'}" class="question-common">Уже есть аккаунт? Авторизуйтесь!</router-link>
	</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	name: 'registration',
	components: {},
	mixins: [],
	props: ['horizontal'],
	data() {
		return {
			errors: [],
			username: null,
			password: null,
			repeat_password: null
		}
	},
	computed: {
		...mapGetters(['ENABLED_COOKIES'])
	},
	methods: {
		validateData() {
			let check = true;

			if (!this.username) {
				this.errors.push('Логин не может быть пустым');
				check = false;
			}
			if (!this.password) {
				this.errors.push('Пароль не может быть пустым');
				check = false;
			}
			if (this.repeat_password !== this.password) {
				this.errors.push('Введенные пароли не совпадают');
				check = false;
			}

			return check;
		},
		submitForm(username, password) {
			this.errors = [];
			if (this.validateData()) {
				this.$store.dispatch('REGISTRATE_USER', {username, password})
				.then((session_hash) => {
					if (this.ENABLED_COOKIES) this.$cookies.set('vue_example_user', session_hash);
					this.$router.push({name: 'home'});
				}) 
				.catch(({type, message}) => {
					if (type === 'user') return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: message, type: 'error'});
					console.error(message);
				})
			}
		}
	}	
}

</script>

<style scoped lang="scss">

</style>