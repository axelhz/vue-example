<template>
	<div class="pagination-wrapper" :class="extra_class">
		<div v-for="(page, i) in pages_length" class="pagination-page" 
			:class="(i+1) === current_page ? 'active' : ''" @click="pageChanged(i+1)" :key="i+1"> 
			{{ i + 1 }}
		</div>
	</div>
</template>


<script>

export default {
	name: 'pagination',
	mixins: [],
	directives: {},
	props: ['elements_length', 'page_size', 'extra_class'],
	data() {
		return {
			current_page: 1,
			pages_length: Math.floor(this.elements_length/this.page_size) + 1
		}
	},
	methods: {
		pageChanged(i) {
			if (this.current_page === i) return;
			this.current_page = i;
			this.$emit('pageChanged', i);
		}
	}
}

</script>

<style scoped lang="scss">
	.pagination-wrapper {
		display: flex;
	}
	
	.active {
		text-decoration: underline;
	}
</style>