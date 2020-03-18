<template>
	<div class="wrapper-common">
		<div class="header-common">Регистрация</div>
		<ul class="errors-common" v-if="errors.length">
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
				let registr = this.$store.dispatch('REGISTRATE_USER', {username, password});

				registr.then((session_hash) => {
					this.$cookies.set('vue_example_user', session_hash);
					this.$router.push({name: 'home'});
					return this.$store.dispatch('ADD_MESSAGE', {text: 'Пользователь успешно зарегистрирован!', type: 'success'})
				});
				registr.then(session_hash => this.$store.dispatch('GET_ALL_POSTS', session_hash));
				registr.then(session_hash => this.$store.dispatch('GET_MOVIES', session_hash));

				registr.catch(({type, message}) => {
					console.log(2);
					if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
					console.error(message);
				})
			}
		}
	}	
}

</script>

<style scoped lang="scss">

</style>