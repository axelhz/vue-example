<template>
	<div>
		<div v-if="ISADMIN">
			<router-link :to="{name: 'post-show'}">Описание</router-link>
			<router-link :to="{name: 'post-editor'}">Редактирование</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	name: 'post-home',
	mixins: [],
	data() {
		return {
		
		}
	},
	computed: {
		...mapGetters(['ISADMIN'])
	},
}

</script>

<style scoped lang="scss">
	
</style>