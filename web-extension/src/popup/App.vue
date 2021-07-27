<template>
    <div id="app">
        <div class="nav">
            <router-link to="/popup-home">Home</router-link> | 
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
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "App"
};
</script>
