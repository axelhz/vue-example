<template>
	<div class="wrapper-common">
		<posts-show></posts-show>
		<movies-show :type="'all'"></movies-show>
		<Map></Map>
	</div>
</template>

<script>
	
import PostsShow from '@/views/posts-show.vue';
import MoviesShow from '@/views/movies-show.vue';
import Map from '@/views/map.vue';

export default {
	name: 'home',
	mixins: [],
	components: {PostsShow, Map, MoviesShow},
	data() {
		return {

		}
	}
}
</script>

<style scoped lang="scss">
	.wrapper-common {
		padding-bottom: 0px;
	}
</style>