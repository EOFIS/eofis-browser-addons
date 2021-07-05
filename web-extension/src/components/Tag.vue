<template>
	<div class="control">
		<div class="tags has-addons">
			<a class="tag is-dark" v-if="tag.source" :href="tag.source_url">{{tag.source}}</a>
			<a class="tag is-link">{{tag.text}}</a>
			<a class="tag is-delete"></a>
		</div>
	</div>
</template>

<script>
	export default {
			name: "Tag",
			props: {
					text: String,
				},
			methods: {
					//encodeTag(source, source_url, text) {
					//		console.log(source);
					//	},
					decodeTag(tagtext) {
							let re = /^(?:"([^"]+)")?(https?:\/\/[^#]+)?#(.+)$/;
							let groups = tagtext.match(re);
							//return groups.slice(1,4);
							return { 
									text: groups[3],
									source: groups[1],
									source_url: groups[2] };
						}
				},
			computed: {
					tag() {
							//const segments = this.text.split('#');
							//const source = segments[0];
							//const source_url = undefined;
							return this.decodeTag(this.text);
						}
				}
		}
</script>
