<template>
    <div class="wrapper-common">
		<yandex-map :zoom="10" :coords="center_coords" :scrollZoom="false">
			<ymap-marker v-for="(cinema, i) in cinemas" :marker-id="i+1"
						:coords="cinema.coords" :balloon-template="balloonTemplate(cinema)"
						:key="i"></ymap-marker>
		</yandex-map>
	</div>
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import cinemas from '@/data/cinemas.js';
import device_detection from "../common/device_detection";

export default {
	name: 'map-component',
	components: {yandexMap, ymapMarker},
	mixins: [device_detection],
	data() {
		return {
			center_coords: [55.75370903771494, 37.61981338262558],
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
	.mobile {
		.ymap-container {
			height: 300px;
		}
	}

	.wrapper-common {
		margin-top: 100px;
	}

	.ymap-container {
		width: 100%;
		overflow:hidden;
		height: 500px;
	}
   
</style>