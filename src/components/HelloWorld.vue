<template>
    <div id="app">
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld.vue',
        data() {
            return {
                video: {},
                canvas: {},
                captures: []
            }
        },
        mounted() { },
        methods: { }
    }
</script>

<style>
    body: {
        background-color: #F0F0F0;
    }
    #main {
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #video {
        background-color: #000000;
    }
    #canvas {
        display: none;
    }
    li {
        display: inline;
        padding: 5px;
    }
</style>
