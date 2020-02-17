<template>
	<div id="app">
		<block-header></block-header>
		<router-view></router-view>
		<block-footer></block-footer>	
		<message-box v-if="MESSAGE_TEXT" :message_text="MESSAGE_TEXT"></message-box>
	</div>
</template>

<script>

import BlockHeader from './components/block-header.vue';
import BlockFooter from './components/block-footer.vue';
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
		this.$store.dispatch('GET_USERNAME');
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
