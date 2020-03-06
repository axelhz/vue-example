<template>
	<div class="wrapper-common">
		<posts-show></posts-show> 
		<Map></Map>
	
	</div>
</template>

<script>
	
import PostsShow from '@/views/posts-show.vue';
import Map from '@/views/map.vue';


export default {
	name: 'home',
	mixins: [],
	components: {PostsShow, Map},
	data() {
		return {

		}
	}
}
</script>

<style scoped lang="scss">

</style>