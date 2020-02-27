<template>
	<div class="wrapper-common">
		<posts-show></posts-show> 
	</div>
</template>

<script>
	
import PostsShow from '@/views/posts-show.vue';

export default {
	name: 'home',
	mixins: [],
	components: {PostsShow},
	data() {
		return {

		}
	}
}
</script>

<style scoped lang="scss">

</style>