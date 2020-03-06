<template>
	<div class="wrapper-common">
		<router-link :to="{name: 'posts-show'}" v-if="this.ISADMIN">Просмотр</router-link>
		<router-link :to="{name: 'posts-editor'}" v-if="this.ISADMIN">Редактирование</router-link>
		<router-view></router-view>
	</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	name: 'posts-home',
	mixins: [],
	computed: {
		...mapGetters(['ISADMIN'])
	},
	data() {
		return {
			
		}
	}
}

</script>

<style scoped lang="scss">
	
</style>