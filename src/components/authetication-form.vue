<template>
	<div class="auth-wrapper">
		<div class="auth-header">{{ getHeader() }}</div>
		<div class="auth-fields">
			<div class="auth-field">
				<input type="text" placeholder="Логин" v-model="login.value" v-if="!isAutheticated" class="auth-input"/>
				<div class="auth-validatetext" v-if="login.validate_text">{{ login.validate_text }}</div>
			</div>
			<div class="auth-field">
				<input type="password" placeholder="Пароль" v-model="password.value" v-if="!isAutheticated" class="auth-input"/>
				<div class="auth-validatetext" v-if="password.validate_text">{{ password.validate_text }}</div>
			</div>
			<div class="auth-field">
				<input type="password" placeholder="Повторите пароль" v-if="!isAutheticated && !authMode" v-model="repeat_password.value" class="auth-input"/>
				<div class="auth-validatetext" v-if="repeat_password.validate_text">{{ repeat_password.validate_text }}</div>
			</div>
		</div>
		<div class="auth-buttons">
			<div class="auth-button button-common" @click="autheticateUser" v-if="!isAutheticated && authMode">Войти</div>
			<div class="auth-button button-common" @click="$emit('exitUser')" v-if="isAutheticated">Выйти</div>
			<div class="auth-button button-common" @click="registrUser" v-if="!isAutheticated && !authMode">Создать аккаунт</div>
			<div class="auth-label" @click="authMode=!authMode" v-if="!isAutheticated && authMode">Регистрация</div>
			<div class="auth-label" @click="authMode=!authMode" v-if="!isAutheticated && !authMode">Авторизация</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'authetication-form',
	components: {},
	mixins: [],
	props: ['isAutheticated', 'username', 'horizontal'],
	data() {
		return {
			authMode: true,
			login: {
				value: null,
				validate_text: ''
			},
			password: {
				value: null,
				validate_text: ''
			},
			repeat_password: {
				value: null,
				validate_text: ''
			}
		}
	},
	watch: {
		authMode() {
			this.clearValues();
		}
	},
	methods: {
		getHeader() {
			if (this.isAutheticated && this.username) return 'Здравствуйте, ' + this.username +  ' !';
			if (this.authMode) return 'Авторизация';
			return 'Регистрация'; 
		},
		clearValues() {
			this.login = {
				value: null,
				validate_text: ''
			};
			this.password = {
				value: null,
				validate_text: ''
			};
			this.repeat_password = {
				value: null,
				validate_text: ''
			};
		},
		autheticateUser() {
			if (this.validateData()) {
				this.$emit('autheticateUser', this.login.value, this.password.value);
				this.clearValues();
			}
		},
		registrUser() {
			if (this.validateData()) {
				this.$emit('registrUser', this.login.value, this.password.value);
				this.clearValues();
			}
		},
		validateData() {
			let check = true;

			if (!this.login.value) {
				this.login.validate_text = 'Логин не может быть пустым';
				check = false;
			}
			if (!this.password.value) {
				this.password.validate_text = 'Пароль не может быть пустым';
				check = false;
			}
			if (!this.authMode && (this.password.value !== this.repeat_password.value)) {
				this.repeat_password.validate_text = 'Введенные пароли не совпадают';
				check = false;
			}

			return check;
		}
	}	
}

</script>

<style scoped lang="scss">
	.auth {
		&-wrapper {
			background: black;
			padding: 15px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		&-header {
			text-decoration: underline;
		}
		&-validatetext {
			color: red;
			font-size: 0.8rem;
		}
		&-label {
			text-align: center;
			font-size: 0.9rem;
		}
	}
</style>