export default {
    data() {
        return {
            device: 'desktop'
        }
    },
    mounted() {
       this.getDevice();
       window.addEventListener('resize', this.getDevice);
    },
    methods: {
        getDevice() {
            this.device = this.$isMobile() ? 'mobile' : 'desktop';
        }
    }
}