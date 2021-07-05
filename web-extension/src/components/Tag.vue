<template>
	<div class="control">
		<div class="tags has-addons">
			<a class="tag is-dark" v-if="tag.type" :href="tag.url">{{tag.type}}</a>
			<a class="tag is-link">{{tag.title ? tag.title : tag}}</a>
			<a class="tag is-delete"></a>
		</div>
	</div>
</template>

<script>
	export default {
			name: "Tag",
			props: {
					tag: { type: [String, Object], required: true}
				},
			methods: {
				}
		}
</script>
