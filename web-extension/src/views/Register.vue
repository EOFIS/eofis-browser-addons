<template>
  <div class="register">
		<div>
			<!-- TODO: what is the below attribute doing? -->
			<form @submit.prevent="submit">
				<div>
					<label for="email">Email:</label>
					<input type="email" name="email" v-model="form.email"/>
				</div>
				<div>
					<label for="full_name">Full Name:</label>
					<input type="text" name="full_name" v-model="form.full_name"/>
				</div>
				<div>
					<label for="password">Password:</label>
					<input type="password" name="password" v-model="form.password"/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
		<p v-if="showError" id="error">An error occurred. Check your email and password.</p>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
	data() {
		return {
			form: {
				email: "",
				full_name: "",
				password: ""
			},
			showError: false
		};
	},
	methods: {
		...mapActions(["register"]),
		async submit(){
			const User = new FormData();
			User.append("email", this.form.email);
			User.append("name", this.form.name);
			User.append("password", this.form.password);
			try {
				await this.register(User);
				//this.$router.push("/notes");
				this.$router.push("/");
				this.showError = false;
			} catch (error) {
				this.showError = true;
			}
		},
	},
};
</script>

<style scoped lang="scss">
* {
	box-sizing: border-box;
}
label {
	padding: 12px 12px 12px 0;
	display: inline-block;
}
button[type=submit] {
	background-color: #4caf50;
	color: white;
	padding: 12px 20px;
	cursor: pointer;
	border-radius: 30px;

	&:hover {
		background-color: #45a049;
	}
}
input {
	margin: 5px;
	box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
	padding: 10px;
	border-radius: 30px;
}
#error {
	color: red;
}
</style>
