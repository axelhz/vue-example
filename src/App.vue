<template>
	<div id="app">
		<block-header></block-header>
		<router-view></router-view>
		<block-footer></block-footer>	
		<message-box v-if="MESSAGE_TEXT" :message_text="MESSAGE_TEXT"></message-box>
	</div>
</template>

<script>

import BlockHeader from './components/header.vue';
import BlockFooter from './components/footer.vue';
import MessageBox from './components/message-box.vue';
import {mapGetters} from 'vuex';

export default {
	name: 'App',
	components: {
		BlockHeader, BlockFooter, MessageBox  
	},
	data() {
		return {
			
		}
	},
	mounted() {	
		if (this.$cookies.get('vue_example_user')) {
			this.$store.dispatch('GET_USER_THROUGH_HASH', this.$cookies.get('vue_example_user'))
			.then(username => {
				console.log(username);
			})
			.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: message, type: 'error'});
				console.error(message);
			})
		}
	},
	computed: {
		...mapGetters(['MESSAGE_TEXT'])
	},
	methods: {}
 }

</script>

<style>
	#app {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #f60;
		font-size: 16px;
	}
</style>
