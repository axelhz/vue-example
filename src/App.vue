<template>
	<div id="app">
		<block-header @showQuasarGrid="show_quasar_grid = true"></block-header>
		<router-view></router-view>
		<block-footer></block-footer>
		<message-box v-if="MESSAGES.length"></message-box>
		<common-form v-if="show_quasar_grid"  @closeQuasarGrid="show_quasar_grid = false" :external_sorters="sorters"
		:external_filters="filters" :url_for_load="'/vagonList'" :external_pagination="pagination">
			<template slot-scope="{form_data}">
				<quasar-grid :form_data="form_data"></quasar-grid>
			</template>
		</common-form>
	</div>
</template>

<script>

import BlockHeader from './components/header.vue';
import BlockFooter from './components/footer.vue';
import MessageBox from './components/message-box.vue';
import {mapGetters} from 'vuex';
import device_detection from "./common/device_detection";
import QuasarGrid from './components/quasar-grid';
import CommonForm from './components/common-form.vue';

export default {
	name: 'App',
	mixins: [device_detection],
	components: {
		BlockHeader, BlockFooter, MessageBox,
		QuasarGrid, CommonForm
	},
	data() {
		return {
			show_quasar_grid: false,
			filters: [
				{
					field: 'a',
					operator: '=',
					value: 1
				},
				{
					field: 'b',
					operator: '<=',
					value: 2
				}
			],
			sorters: [
				{
					field: 'a',
					order: '+'
				},
				{
					field: 'b',
					order: '-'
				}
			],
			pagination: {
				limit: 50,
				offset: 1,
				page: 1
			}
		}
	},
	watch: {
		device(value) {
			let root = document.getElementsByTagName( 'html' )[0];
			if (value === 'mobile') {
				root.classList.add('mobile');
			} else {
				root.classList.remove('mobile');
			}
		}
	},
	mounted() {
		const session_hash = this.$cookies.get('vue_example_user');
		if (session_hash) {
			let promise = this.$store.dispatch('GET_USER_THROUGH_HASH', session_hash)

			promise.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
				console.error(message);
			});
			promise.then(() => {
				this.$store.dispatch('GET_MOVIES', session_hash)
			}).catch(() => {});
			promise.then(() => {
				this.$store.dispatch('GET_ALL_POSTS', session_hash)
			}).catch(() => {});
		} else {
			this.$store.dispatch('GET_MOVIES')
			.catch(({type, message}) => {
				if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
				console.error(message);
			});
		}

		this.$store.dispatch('GET_SHOWN_POSTS')
		.catch(({type, message}) => {
			if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
			console.error(message);
		});
	},
	computed: {
		...mapGetters(['MESSAGES', 'MOVIES', 'LIKED_MOVIES'])
	},
	methods: {}
 }

</script>

<style lang="scss">
	#app {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #f60;
	}



</style>
