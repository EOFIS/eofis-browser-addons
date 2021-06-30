<template>
	<div>
		Click below to go to the EOFIS app.<br/>
		<button @click="openStandalone">EOFIS</button>
	</div>
</template>

<script>
	export default {
			name: "Popup",
			methods: {
					openStandalone() {
							console.log("Opening EOFIS tab");
							browser.tabs.create({
									"url": "/index.html"
								});
						}
				}
		};
</script>
