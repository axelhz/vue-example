<template>
	<footer class="block-footer">
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
	.block-footer {
		width: 100%;
		max-width: 1920px;
		background: black;
		color: #f60;
		position: absolute;
		bottom: 0;
		padding: 1rem 0;
	}

	.footer-text {
		padding-left: 20px;
	}

</style>