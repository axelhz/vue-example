<template>
	<div class="wrapper-common">
		<block-news></block-news>
	</div>
</template>

<script>
	
import BlockNews from '../components/block-news.vue';

export default {
	name: 'home',
	mixins: [],
	components: {BlockNews},
	data() {
		return {

		}
	}
}
</script>

<style scoped lang="scss">

</style>