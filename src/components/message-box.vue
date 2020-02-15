<template>
	<div class="messagebox-space">
		<div class="messagebox-shadow" @click="closeMessageBox"></div>
		<div class="messagebox-container">
			<div class="messagebox-area">
				<div class="messagebox-stripe"></div>
				<div class="messagebox-close" @click="closeMessageBox">x</div>
				<div class="messagebox-text" v-html="message_text"></div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'message-box',
	props: ['message_text'],
	components: {},
	mixins: [],
	data() {
		return {

		}
	},
	methods: {
		closeMessageBox() {
			this.$store.dispatch('CHECK_MESSAGE_TEXT', '');
		}
	}
}

</script>

<style scoped lang="scss">
	.messagebox {
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
		&-area {
			position: relative;
			opacity: 1;
			width: 300px;
			background: white;
			padding-top: 25px;
			border-radius: 10px 10px 10px 10px;
		}
		&-stripe {
			background: #f60;
			position: absolute;
			top: 0;
			width: 100%;
			height: 25px;
			border-radius: 10px 10px 0px 0px;
		}
		&-close {
			font-weight: bold;
			position: absolute;
			top: 0;
			right: 0;
			font-size: 20px;
			margin-right: 8px;
			margin-top: 3px;
			color: white;
			cursor: pointer;
			font-size: 0.94rem;
		}
		&-text {
			padding: 15px 0px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

	}
	
</style>