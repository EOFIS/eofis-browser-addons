<template>
	<div class="box">
		{{this.note}}
		<p v-for="field in this.note.fields" :key="field.id">{{field}}</p>
	</div>
</template>

<script>
export default {
	name: "Note",
	props: {
		note: Object
	}
}
</script>
