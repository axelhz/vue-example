<template>
	<div class="wrapper-common">
		<div class="header-common">Авторизация</div>
		<ul class="errors-common" v-if="errors.length">
			<li class="error-common" v-for="(error, i) in errors" :key="i">{{ error }}</li>
		</ul>
		<form @submit.prevent="submitForm(username, password)" class="form-common">
			<fieldset class="fieldset-common">
				<input type="text" placeholder="Имя пользователя" v-model="username" class="input-common"/>
			</fieldset>
			<fieldset class="fieldset-common">
				<input type="password" placeholder="Пароль" v-model="password" class="input-common"/>
			</fieldset>
			<button class="button-common">Войти</button>
		</form>
		<router-link :to="{name: 'registr'}" class="question-common">Хотите зарегистрироваться?</router-link>
	</div>
</template>

<script>

export default {
	name: 'authetication',
	components: {},
	mixins: [],
	props: ['horizontal'],
	data() {
		return {
			errors: [],
			username: null,
			password: null
		}
	},
	methods: {
		validateData() {
			let check = true;

			if (!this.username) {
				this.errors.push('Имя пользователя не может быть пустым');
				check = false;
			}
			if (!this.password) {
				this.errors.push('Пароль не может быть пустым');
				check = false;
			}

			return check;
		},
		submitForm(username, password) {
			this.errors = [];
			if (this.validateData()) {
				this.$store.dispatch('AUTHETICATE_USER', {username, password})
				.then(session_hash => {
					this.$cookies.set('vue_example_user', session_hash)
					this.$router.push({name: 'home'})
					this.$store.dispatch('GET_ALL_POSTS', session_hash)
					.catch(({type, message}) => {
						if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
						console.error(message);
					})
				})
				.catch(({type, message}) => {
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