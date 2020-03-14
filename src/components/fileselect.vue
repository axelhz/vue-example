<template>
	<div class="fileselect-wrapper">
		<input type="file" @change="handleFileChange" class="fileselect-inputfile">
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

<style scoped lang="scss">
	.mobile {
		.fileselect-text {
			left: 120px;
			top: 3px;
		}
	}

	.fileselect {
		&-wrapper {
			width: 100%;
			position: relative;
			display: flex;
		}

		&-text {
			position: absolute;
			left: 125px;
		}

		&-inputfile {
			color: transparent;
		}
	}
</style>