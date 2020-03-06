<template>
    <div>
		<div id="map"></div>
	</div>
</template>

<script>

    export default {
        name: 'block-map',
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(this.loadMap());
        },
        computed: {},
        methods: {
			loadMap() {
				let script = document.createElement('script');
                script.src = '//api-maps.yandex.ru/2.1/?load=package.standard&lang=ru_RU';
                document.head.appendChild(script);
                script.onload = () => {
					ymaps.ready(() => {
						
					})
                };
			},
            /*initYandexMap() {
            
                let zoomControl = new ymaps.control.ZoomControl({
                    options: {
                        position: {
                            left: 'auto',
                            right: 10,
                            top: 108,
                        }
                    }
                });
                let center_x = this.device_platform === 'mobile' ?
                    this.CONSTANTS.coords.x_center_small : this.CONSTANTS.coords.x_center_big;

                let myMap = new ymaps.Map("ya-karto", {
                    center: [this.CONSTANTS.coords.y_center, center_x],
                    zoom: 16,
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                });
                myMap.controls.add(zoomControl);

                myMap.geoObjects
                    .add(new ymaps.Placemark([this.CONSTANTS.coords.y_salon, this.CONSTANTS.coords.x_salon], {
                        iconContent: this.CONSTANTS.name,
                    }, {
                        preset: "islands#blueStretchyIcon",
                        iconColor: '#1e98ff'
                    }));
                if (isMobile.any() || this.device_platform !== 'desktop') {
                    myMap.behaviors.disable('drag');
                }
                myMap.behaviors.disable('scrollZoom');
            },
            waitYmaps() {
                let script = document.createElement('script');
                script.src = '//api-maps.yandex.ru/2.1/?load=package.standard&lang=ru_RU';
                document.head.appendChild(script);
                script.onload = () => {
                    ymaps.ready(this.initYandexMap);
                };
            }*/
        }
    }
</script>

<style scoped lang="scss">
   
</style>