<template>
	<div class="wrapper-common">
		<div class="options-wrapper" v-if="ISADMIN">
			<router-link :to="{name: 'posts-show'}" class="link-option">Просмотр</router-link>
			<router-link :to="{name: 'posts-editor'}" class="link-option">Редактирование</router-link>
		</div>
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
	.wrapper-common {
		color: black;
	}
</style>