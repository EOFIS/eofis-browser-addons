<template>
    <div class="app">
        <div class="nav">
            <vs-crumbs root="EOFIS">d</vs-crumbs>
            <!--<router-link to="/"><img src="icons/32.png" alt="Popup home, eofis logo"/></router-link>-->
                    <!--
                    <li><a href="#">Components</a></li>
                    <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
                    -->
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
        <router-view name="popup"></router-view>
    </div>
</template>

<script>
import { EOFISNote } from "@/popup/main.js";
export default {
    name: "App",
    mounted() {
        if (!EOFISNote) {
            EOFISNote = browser.extension.getBackgroundPage().EOFISNote;
        }
    }
};
</script>
