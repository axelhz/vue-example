<template>
    <div class="wrapper-common">
		<div class="header-common">Местоположение</div>
		<yandex-map :coords="coords">
			<ymap-marker marker-id="123" :coords="coords" :balloon-template="balloonTemplate">
			</ymap-marker>
		
		</yandex-map>
	</div>
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
	name: 'block-map',
	components: {yandexMap, ymapMarker},
	data() {
		return {
			coords: [54, 39]
		}
	},
	mounted() {
	
	},
	computed: {
		balloonTemplate() {
			return `
				<h1 class="red">Hi, everyone!</h1>
				<p>I am here: ${this.coords}</p>
				<img src="http://via.placeholder.com/350x150">
				`
		}
	}
}
</script>

<style scoped lang="scss">

	.wrapper-common {
		margin-top: 100px;
	}

	.ymap-container {
		width: 100%;
		height: 500px;
	}
   
</style>