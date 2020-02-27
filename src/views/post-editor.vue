<template>
	<div class="post-wrapper" v-if="post">
		<div class="post-editor-adder">
			
		</div>
	
	</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	name: 'post-editor',
	components: {},
	mixins: [],
	directives: {},
	props: [],
	data() {
		return {
			post: null 
		}
	},
	computed: {
		...mapGetters(['ALL_POSTS', 'ISADMIN'])
	},
	watch: {
		'$route.param.id'(id) {
			this.checkPost(id);
		}
	},
	created() {
		if (!this.ISADMIN) {
			this.$router.replace({name: 'post-show'});
		} else {
			this.checkPost(this.$route.params.id);	
		}
	},
	methods: {
		checkPost(id) {
			if (+id === 0) {
				this.post = {
					title: '',
					description: [],
					img: '',
					stat: 'new'
					
				};
			} else {
				this.post = null;
				this.ALL_POSTS.forEach(el => {
					if (el.id === +id) {
						this.post = el;
					}
				});
			}
				
				
			if (!this.post) this.$router.replace({name: 'post-editor', params: {id: this.ALL_POSTS[0].id}});
		}
	}
}


</script>