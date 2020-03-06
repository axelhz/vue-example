<template>
    <div class="wrapper-common">
		<div class="header-common">Местоположение кинотеатров</div>
		<yandex-map :zoom="10" :coords="[55.75370903771494, 37.61981338262558]">
			<ymap-marker v-for="(cinema, i) in cinemas" :marker-id="i+1" 
						:coords="cinema.coords" :balloon-template="balloonTemplate(cinema)"
						:key="i"></ymap-marker>
		
		</yandex-map>
	</div>
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import cinemas from '@/data/cinemas.js';

export default {
	name: 'block-map',
	components: {yandexMap, ymapMarker},
	data() {
		return {
			coords: [54, 39],
			cinemas: cinemas
		}
	},
	mounted() {

	},
	methods: {
		balloonTemplate(cinema) {
			return `
				<h1>` + cinema.name + `</h1>
				<span>` + cinema.address + `</span>
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