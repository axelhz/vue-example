<template>
	<div class="pagination-wrapper" :class="extra_class" v-if="pages_length > 1">
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
			current_page: 1
		}
	},
	computed: {
		pages_length() {
			let devision = this.elements_length/this.page_size;
			return (Math.floor(devision) === devision) ? devision : Math.floor(devision) + 1;
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
	.pagination {
		&-wrapper {
			margin: 15px 0px 25px 0px;
			display: flex;
			align-items: center;
		}

		&-page {
			font-size: 1.3rem;
			margin: 0px 2px;
			cursor: pointer;
			&.active {
				border-bottom: 3px solid black;
				font-weight: bold;
				font-size: 1.5rem;
			}
		}
	}
</style>