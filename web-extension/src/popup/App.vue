<template>
    <div class="app">
        <div class="nav">
            <router-link to="/">Home</router-link> | 
            <router-link to="/register">Home</router-link> | 
            <!--
                <span v-if="isLoggedIn">
                <a @click="logout">Logout</a>
                </span>
                <span v-else>
                <router-link to="/register">Register</router-link> | 
                <router-link to="/login">Login</router-link>
                </span>
            -->
        </div>
        <router-view style="background:blue"></router-view>
        <router-view style="background:red" name="popup"></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>
