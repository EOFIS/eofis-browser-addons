<template>
  <div>
		<p>This is a hello from {{ defaultText }} with the message {{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
	props: {
		msg: String
		},
  mounted() {
    browser.runtime.sendMessage({});
  },
  computed: {
    defaultText() {
      return browser.i18n.getMessage("extName");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
