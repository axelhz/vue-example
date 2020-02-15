<template>
	<div class="wrapper-common">
		<div class="header-common">Регистрация</div>
		<ul class="errors-common">
			<li class="error-common" v-for="(error, i) in errors" :key="i">{{ error }}</li>
		</ul>
		<form @submit.prevent="submitForm(login, password)" class="form-common">
			<fieldset class="fieldset-common">
				<input type="text" placeholder="Логин" v-model="login" class="input-common"/>
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

export default {
	name: 'registration',
	components: {},
	mixins: [],
	props: ['horizontal'],
	data() {
		return {
			errors: [],
			login: null,
			password: null,
			repeat_password: null
		}
	},
	methods: {
		validateData() {
			let check = true;

			if (!this.login) {
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
		submitForm(login, password) {
			this.errors = [];
			if (this.validateData()) {
				this.$store
				.dispatch('SAVE_USERS', {login, password})
				.then(() => this.$router.push({name: 'home'}))
			}
		}
	}	
}

</script>

<style scoped lang="scss">

</style>