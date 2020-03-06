<template>
	<div class="editor-common" v-if="post">
		<ul class="errors-common">
			<li class="error-common" v-for="(error, i) in errors" :key="i">{{ error }}</li>
		</ul>
		<form @submit.prevent="submitForm" class="form-common">
			<div class="label-common">Заголовок</div>
			<fieldset class="fieldset-common">
				<input type="text" placeholder="Заголовок" v-model="post.title" class="input-common"/>
			</fieldset>
			<div class="label-common">Фоновая картинка</div>
			<fieldset class="fieldset-common">
				<file-select v-model="post.img" :filename="post.img"></file-select>
			</fieldset>
			<div class="label-common">Описание</div>
			<div class="post-adder">
				<div @click="post.description.push({type: 'text', value: ''})">Добавить текст</div>
				<div @click="post.description.push({type: 'img', value: ''})">Добавить картинку</div>
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
				let {id, title, description, img} = this.post,				
					action = id === 0 ? this.$store.dispatch('CREATE_POST', {title, description, img}) : this.$store.dispatch('CHANGE_POST', {id, title, description, img});
				
				action.then(new_id => {
					if (new_id) this.$router.replace({name: 'post-editor', params: { id: new_id }});
					return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: 'Пост сохранен!', type: 'success'});
				})
				.catch(({type, message}) => {
					if (type === 'user') return this.$store.dispatch('CHECK_MESSAGE_TEXT', {new_message_text: message, type: 'error'});
					console.error(message);
				}) 
			}
		}
	}
}

</script>

<style scoped lang="scss">
	.editor-common {
		width: 100%;
		max-width: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.form-common {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.textarea-common {
		min-height: 100px;
		width: 100%;
	}
	.title {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
		margin-bottom: 50px;
	}
	.description-item {
		width: 100%;
		margin-bottom: 30px;
	}

	.description-item-img {
		width: 100%;
		height: calc(100vw*500/1920);
		object-fit: cover;
		max-height: 500px;
	}

	.description-item-text {
		padding: 0 20px 0px 0px;
	}
	
	.post-adder {
		display: flex;
	}

</style>