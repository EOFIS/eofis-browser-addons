<template>
	<div id="app">
		<Nav/>
		<router-view />
	</div>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
	components: {
		Nav
	}
}
	/*
const axios = require('axios');
const AX = axios.create({
	baseURL: 'http://localhost:5000/api/v0',
	responseType: 'json',
	responseEncoding: 'utf8'
	//url: '/axios',
	//baseURL: 'https://github.com'
	});
// When logged in, set AUTH_TOKEN
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
AX.interceptors.response.use((response) => {
console.log(response);
	}, (error) => {
	console.log(`ERROER ${JSON.stringify(error, null, 4)}`);
	console.log(error);
	return Promise.reject(error);
});
AX.get('/users/').then(function (response) {
		console.log(`RESPONSE: ${response}`);
});
 */
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
