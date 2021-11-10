<template>
	<div class="login">
		<div>
			<form @submit.prevent="submit">
				<div>
					<label for="email">Email:</label>
					<input type="email" name="email" v-model="form.email"/>
				</div>
				<div>
					<label for="password">Password:</label>
					<input type="password" name="password" v-model="form.password"/>
				</div>
				<button type="submit">Submit</button>
			</form>
            <p v-if="clientError" id="error">Email or password is incorrect. {{clientError}}</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "Login",
	components: {},
	data() {
		return {
			form: {
				email: "",
				password: "",
			},
			clientError: ""
		};
	},
	methods: {
		...mapActions(["login"]),
		async submit() {
			const User = new FormData();
			User.append("email", this.form.email);
			User.append("password", this.form.password);
			try {
				await this.login(User);
				this.$router.push("/notes");
				this.clientError = "";
			} catch (error) {
                console.log(error);
				this.clientError = error;
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
