<template>
	<div>
		<Popup />
	</div>
</template>

<script>
import Popup from "@/components/Popup.vue";

export default {
  name: "App",
  components: { Popup },
};
</script>

<style scoped>
html {
  width: 400px;
  height: 200px;
}
</style>
