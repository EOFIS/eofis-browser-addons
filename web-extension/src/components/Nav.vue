<template>
	<div id="nav">
		<router-link to="/">Home</router-link> | 
		<router-link to="/notes">Notes</router-link> | 
		<span v-if="isLoggedIn">
			<a @click="logout">Logout</a>
		</span>
		<span v-else>
			<router-link to="/register">Register</router-link> | 
			<router-link to="/login">Login</router-link>
		</span>
	</div>
</template>

<script>
export default {
	name: 'NavBar',
	computed : {
		isLoggedIn: function(){ return this.$store.getters.isAuth }
	},
	methods: {
		async logout () {
			await this.$store.dispatch('logout');
			this.$router.push('/login');
		}
	},
}
</script>

<style scoped lang="scss">
#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&:hover {
			cursor: pointer;
		}

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
