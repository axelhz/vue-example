<template>
	<footer class="footer-container">
		<router-link class="footer-text" :to="{name: 'home', params: {}}">Лучшие Фильмы, 2020</router-link>
	</footer>
</template>

<script>

export default {
	name: 'block-footer',
	mixins: [],
	data() {
		return {

		}
	}
}

</script>

<style scoped lang="scss">
	.footer {
		&-container {
			width: 100%;
			max-width: 1920px;
			background: black;
			color: #f60;
			position: absolute;
			bottom: 0;
			padding: 1rem 0;
		}

		&-text {
			padding-left: 20px;
		}
	}
</style>