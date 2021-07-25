<template>
    <span class="icon-text">
        <span class="icon">
            <fa-icon :icon="this.icon" :color="this.color"/>
        </span>
        <span v-if="this.text" >{{this.text}}</span>
    </span>
</template>

<script>
export default {
    name: "Icon",
    props: {
        icon: {
            type: [Object, Array, String],
            required: true
        },
        text: {
            type: String,
            default: undefined,
            required: false
        },
        color: {
            type: String,
            default: undefined,
            required: false
        }
    }
};
</script>
