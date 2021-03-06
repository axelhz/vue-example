<template>
	<div class="post-wrapper" v-if="post">
		<ul class="errors-common">
			<li class="error-common" v-for="(error, i) in errors" :key="i">{{ error }}</li>
		</ul>
		<form class="form-common" @submit.prevent="submitForm">
			<div class="editor-label">1) Заголовок:</div>
			<fieldset class="fieldset-common">
				<input type="text" class="input-common" placeholder="Заголовок" v-model="post.title"/>
			</fieldset>
			<div class="editor-label">2) Фоновая картинка:</div>
			<fieldset class="fieldset-common">
				<file-select v-model="post.img" :filename="post.img"></file-select>
			</fieldset>
			<div class="editor-label">3) Описание:</div>
			<div class="post-adder-wrapper">
				<div @click="post.description.push({type: 'text', value: ''})" class="post-adder">Добавить текст</div>
				<div @click="post.description.push({type: 'img', value: ''})" class="post-adder">Добавить картинку</div>
			</div>
			<div class="description-item" v-for="(description, i) in post.description" :key="i">
				<file-select v-model="description.value" :filename="description.value" v-if="description.type === 'img'"></file-select>
				<textarea class="textarea-common" v-if="description.type === 'text'" v-model="description.value"></textarea>
				<div class="description-item-deleter" @click="post.description.splice(i, 1)">x</div>
			</div>
			<button class="button-common">Сохранить</button>
		</form>
	</div>
</template>

<script>

import FileSelect from '@/components/fileselect.vue';
import {mapGetters} from 'vuex';

export default {
	name: 'post-editor',
	components: {FileSelect},
	mixins: [],
	directives: {},
	props: ['post'],
	data() {
		return {
			errors: []
		}
	},
	computed: {
		...mapGetters(['ISADMIN'])
	},
	created() {
		if (!this.ISADMIN) {
			this.$router.replace({name: 'post-show', params: {id: this.$route.params.id}});
		}
	},
	methods: {
		validateData() {
			let check = true,
				images = [];
			
			if (!this.post.title) {
				this.errors.push('Заголовок не может быть пустым');
				check = false;
			}
			
			if (!this.post.img) {
				this.errors.push('Отсутствует фоновая картинка');
				check = false;
			} else images.push(this.post.img);
			
			if (!this.post.description.length) {
				this.errors.push('В описании должен быть хотя бы один элемент');
				check = false;
			} else {
				let empty_element = this.post.description.find(el => !el.value);
				
				if (empty_element) {
					this.errors.push('В описании не должно быть пустых элементов');
					check = false;
				}
				
				this.post.description.forEach(el => { if (el.type === 'img') images.push(el.value)});
				
				let wrong_image_format = images.find(el => !(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(el));
				
				if (wrong_image_format) {
					this.errors.push('Допустимые форматы картинок: .gif, .jpg, .jpeg, .tiff, .png, .webp, .bmp');
					check = false;
				}
			}
			
			return check;	
		},
		submitForm() {
			this.errors = [];
			if (this.validateData()) {
				const {id, title, description, img} = this.post,
					action = id === 0 ? this.$store.dispatch('CREATE_POST', {post: {title, description, img}, session_hash: this.$cookies.get('vue_example_user')}) :
										this.$store.dispatch('CHANGE_POST', {post: {id, title, description, img}, session_hash: this.$cookies.get('vue_example_user')});
				
				action.then(new_id => {
					if (new_id) this.$router.replace({name: 'post-editor', params: { id: new_id }});
					return this.$store.dispatch('ADD_MESSAGE', {text: 'Пост сохранен!', type: 'success'});
				})
				.catch(({type, message}) => {
					if (type === 'user') return this.$store.dispatch('ADD_MESSAGE', {text: message, type: 'error'});
					console.error(message);
				}) 
			}
		}
	}
}

</script>

<style scoped lang="scss">
	.mobile {
		.description-item-deleter {
			left: -17px;
			border: none;
			font-size: 1.2rem;
		}
	}
	.form-common {
		width: 100%;
	}
	.description-item {
		width: 100%;
		margin-bottom: 30px;
		position: relative;
		&-img {
			width: 100%;
			height: calc(100vw*500/1920);
			object-fit: cover;
			max-height: 500px;
		}
		&-text {
			padding: 0 20px 0px 0px;
		}

		&-deleter {
			position: absolute;
			left: -30px;
			top: 0;
			border: 1px solid black;
			border-radius: 100%;
			padding: 4px 4px 8px 4px;
			line-height: 50%;
			cursor: pointer;
			font-size: 1.1rem;
		}
	}

	.post-adder {
		border: 1px solid black;
		border-radius: 5px;
		padding: 3px 5px;
		cursor: pointer;

		&:first-child {
			margin-right: 10px;
		}
		&-wrapper {
			display: flex;
			margin: 20px 0px 30px 0px;
		}
	}
</style>