<template>
	<div class="box">
		<aside class="hidden">
			<span class="icon-text">
				<span class="icon">
					<i class="fas fa-ellipsis-v"></i>
				</span>
				<span>Menu</span>
			</span>
			<span class="icon-text">
				<span class="icon">
					<i class="fas fa-home"></i>
				</span>
				<span>Home</span>
			</span>
			<span class="icon-text">
				<span class="icon">
					<i class="fas fa-check"></i>
				</span>
				<span>Favourite</span>
			</span>
			<span class="icon-text">
				<span class="icon">
					<i class="fas fa-trash"></i>
				</span>
				<span>Delete</span>
			</span>
			<span class="icon-text">
				<span class="icon">
					<i class="fas fa-edit"></i>
				</span>
				<span>Edit</span>
			</span>
		</aside>
		{{this.note}}
		<TagList :tags="this.note.tags"/>
		<p v-for="field in this.note.fields" :key="field.id" class="block">{{field}}</p>
	</div>
</template>

<script>
	import TagList from "@/components/TagList.vue";
	export default {
			name: "Note",
			props: {
					note: Object
				},
			components: {
					TagList
				}
		}
</script>
