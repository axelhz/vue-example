<template>
	<div class="fileselect-wrapper">
		<input type="file" @change="handleFileChange" class="inputfield-novaluetext">
		<div class="fileselect-text">{{ filename }}</div>
	</div>
</template>

<script>
export default {
	props: ['filename'],
	methods: {
		handleFileChange(e) {
			this.$emit('input', e.target.files[0].name)
		}
	}
}
</script>

<style scoped>

	.fileselect-wrapper {
		width: 100%;
		position: relative;
		display: flex;
	}
	
	.fileselect-text {
		position: absolute;
		left: 125px;
	}

	.inputfield-novaluetext {
		color: transparent;
	}

</style>