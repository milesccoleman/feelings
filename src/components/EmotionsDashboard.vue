<template>
    <div id="app">
        <div><video ref="video" id="video" width="640" height="480" autoplay></video></div>
        <div><button id="snap" v-on:click="captureAndAnalyze()">Snap Photo</button></div>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <ul>
            <li v-for="c in captures">
                <img ref="image" v-bind:src="c" height="50" />
            </li>
            <li>
              {{output}}
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'EmotionsDashboard',
        data() {
            return {
                video: {},
                canvas: {},
                captures: [],
                output: '',
                image: ''
            }
        },
       mounted() {

        var self = this;
        var constraints = { audio: true, video: { width: 1280, height: 720 } };
        navigator.mediaDevices.getUserMedia(constraints)
.       then(function(mediaStream) {
        self.video = document.querySelector('video');
        self.video.srcObject = mediaStream;
        self.video.onloadedmetadata = function(e) {
        self.video.play();
  };
})

},
        methods: {
    captureAndAnalyze() {
        var self = this;
        self.canvas = self.$refs.canvas;
        var context = self.canvas.getContext("2d").drawImage(self.video, 0, 0, 640, 480);
        self.captures.push(canvas.toDataURL("image/png"));
        self.image = self.canvas.toDataURL('image/png');
          const formData = new FormData();
            formData.append('app_key', 'd08c791a788349a4bcfcaec6818a1c76');
            formData.append('img', self.image);
            axios.post("https://api-face.sightcorp.com/api/detect/", formData)
              .then(function (result) {
              self.output = result.data;
              alert(self.image);
              console.log(result);
          },  function (error) {
              console.log(error);
    });
}
  }
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
