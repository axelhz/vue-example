<template>
	<div class="messagebox-space" tabindex="0" @keyup.esc="show_messagebox = false"  @click="show_messagebox = false">
		<div class="messagebox-shadow"></div>
		<div class="messagebox-container">
			<transition name="messagebox" v-on:after-leave="closeMessageBox">
				<div class="messagebox" v-if="show_messagebox">
					<div class="messagebox-header">Сообщение</div>
					<div class="messagebox-close">x</div>
					<div class="messagebox-body">
						<div class="messagebox-item" v-for="(message, i) in MESSAGES" :key="i">
							<div class="messagebox-icon" :class="message.type"></div>
							<div class="messagebox-text" :class="message.type">{{message.text}}</div>
						</div>
						<div class="button-common">OK</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
	name: 'message-box',
	props: [],
	components: {},
	mixins: [],
	data() {
		return {
			show_messagebox: false
		}
	},
	mounted() {
		this.show_messagebox = true;
		this.$el.focus();
	},
	computed: {
		...mapGetters(['MESSAGES'])
	},
	methods: {
		closeMessageBox() {
			this.$store.dispatch('CLEAR_MESSAGES')
		}
	}
}

</script>

<style scoped lang="scss">
	.mobile {
		.messagebox {
			width: 220px;
		}

		.button-common {
			width: 60px;
		}
	}

	.button-common {
		width: 80px;
		height: 24px;
		font-size: 0.7rem;
		align-self: flex-end;
		margin-top: 20px;
	}

	.messagebox {
		position: relative;
		opacity: 1;
		width: 300px;
		background: #A6A6A6;
		box-shadow: 0px 0px 10px black;
		border-radius: 10px;
		padding: 0px 6px 6px 6px;
		&-shadow {
			position: fixed;
			top: -100vh;
			right: -100vh;
			bottom: -100vw;
			left: -100vw;
			background: black;
			opacity: 0.5;
			z-index: 3;
		}
		&-container {
			position: fixed;
			top: 10vh;
			width: 100vw;
			left: 0;
			display: flex;
			justify-content: center;
			z-index: 4;
		}
		&-header {
			color: black;
			font-size: 0.9rem;
			font-weight: bold;
			padding-left: 3px;
			padding-top: 2px;
		}
		&-body {
			border: 1px solid #ADADAD;
			background: white;
			display: flex;
			flex-direction: column;
			padding: 7px;
			margin-top: 4px;
		}
		&-item {
			display: flex;
			align-items: flex-start;
		}
		&-icon {
			width: 15px;
			height: 15px;
			margin: 0 7px 0px 3px;

			&.error {
				background: url('../images/icons/error.png') no-repeat center;
				background-size: contain;
			}

			&.success {
				background: url('../images/icons/success.png') no-repeat center;
				background-size: contain;
			}
		}
		&-text {
			font-size: 0.8rem;
			font-weight: bold;

			&.error {
				color: red;
			}

			&.success {
				color: green;
			}
		}
		&-close {
			font-weight: bold;
			position: absolute;
			top: 0;
			right: 0;
			margin-right: 10px;
			color: black;
			cursor: pointer;
			font-size: 1rem;
		}
	}

	.messagebox-enter-active {
		animation: messagebox-in .1s;
	}

	.messagebox-leave-active {
		animation: messagebox-out .2s;
	}

	@keyframes messagebox-in {
		0% {
			margin-left: 100%;
		}

		100% {
			margin-left: 0%;
		}
	}

	@keyframes messagebox-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(0);
		}
	}

</style>