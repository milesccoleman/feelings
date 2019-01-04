<template>
<!-- Main div -->
  <div id="app">
<!-- Video stream -->
    <div><video ref="video" id="video" width="640" height="480" autoplay></video></div>
<!-- Captured snapshots <ul id='snapshots'><li v-for="url in captures"><img id="images" ref="image" v-bind:src="url" height="50"/></li></ul> -->
<!-- Canvas element necessary for staging snapshots -->
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
<!-- Results chart -->
    <div><canvas id="canvas2" height="400" width="650"></canvas></div>
<!-- Analysis button -->
    <div><button id="snap" v-on:click="captureAndAnalyze()">Analyze Emotions</button></div>
<!-- Analysis results
    <div id="emotions">
      <div id="sadness">Sadness: {{sad}}</div>
      <div id="disgust">Disgust: {{disgusted}}</div>
      <div id="anger">Anger: {{angry}}</div>
      <div id="surprise">Surprise: {{surprised}}</div>
      <div id="fear">Fear: {{fearful}}</div>
      <div id="happiness">Happiness: {{happy}}</div>
    </div> -->
  </div>
</template>

<script>
//api call needs axios
import axios from 'axios';

//set up variables
export default {
  name: 'EmotionsDashboard',
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      sad: '',
      disgusted: '',
      angry: '',
      surprised: '',
      fearful: '',
      happy: '',
    }
  },

mounted() {
//find and use webcam
  var self = this;
  var constraints = { audio: false, video: { width: 1280, height: 720 } };
  navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
    self.video = document.querySelector('video');
    self.video.srcObject = mediaStream;
    self.video.onloadedmetadata = function(e) {
    self.video.play();
    };
  })
},

methods: {
//grab snapshot
  captureAndAnalyze() {
    var self = this;
    self.canvas = self.$refs.canvas;
    var context = self.canvas.getContext("2d").drawImage(self.video, 0, 0, 640, 480);
    self.captures.push(canvas.toDataURL("image/png"));
    var dataURL = self.captures;

//send snapshot to analyze facial emotion
    const formData = new FormData();
    formData.append('app_key', 'd08c791a788349a4bcfcaec6818a1c76');
    formData.append('url', 'https://media4.s-nbcnews.com/j/newscms/2017_47/2233721/171120-smile-stock-njs-333p_4ecd5b9a2aefbfdfbc3331c6d474d963.fit-2000w.jpg');
      axios.post("https://api-face.sightcorp.com/api/detect/", formData).then(function (result) {
        self.output = result.data;
        console.log(result);

//populate variables with analysis data
    self.sad = result.data.people[0].emotions.sadness;
    self.disgusted = result.data.people[0].emotions.disgust;
    self.angry = result.data.people[0].emotions.anger;
    self.surprised = result.data.people[0].emotions.surprise;
    self.fearful = result.data.people[0].emotions.fear;
    self.happy = result.data.people[0].emotions.happiness;

//variables for chart
      var canvas2;
      var context2;
      var Val_Max;
      var Val_Min;
      var sections;
      var xScale;
      var yScale;
      var y;
      var scale;
      var i;

//values of each item on the graph
      var itemName = [ "Sadness", "Disgust", "Anger", "Surprise", "Fear", "Happiness"];
      var itemValue = [ self.sad, self.disgusted, self.angry, self.surprised, self.fearful, self.happy ];

//initialize values for each variables
	      sections = 6;
	      Val_Max = 100;
	      var stepSize = 1;
	      var columnSize = 50;
	      var rowSize = 60;
	      var margin = 10;
	      var header = ""

//draw chart
	      canvas2 = document.getElementById("canvas2");
	      context2 = canvas2.getContext("2d");
	      context2.fillStyle = "#000;"

	      yScale = (canvas2.height - columnSize - margin) / (Val_Max);
	      xScale = (canvas2.width - rowSize) / (sections);

//background lines
	      context2.strokeStyle="#000;";
	      context2.beginPath();

//column names
	      context2.font = "19 pt Arial;"
	      context2.fillText(header, 2,columnSize - margin);



//print names of each data entry
	      context2.font = "20 pt Verdana";
	      context2.textBaseline="bottom";
	        for (i=0;i<6;i++) {
		        computeHeight(itemValue[i]);
		        context2.fillText(itemName[i], xScale * (i+1), y - margin);
	        }

//shadow for graph's bar lines with color and offset
	      context2.fillStyle="#9933FF;";
        context2.shadowColor = 'rgba(128,128,128, 0.5)';

//shadow offset along X and Y direction
	      context2.shadowOffsetX = 9;
	      context2.shadowOffsetY = 3;

//translate to bottom of graph in order to match the data
        context2.translate(0,canvas2.height - margin);
	      context2.scale(xScale,-1 * yScale);

//draw each graph bars
	      for (i=0;i<6;i++) {
		      context2.fillRect(i+1, .5, 0.3, itemValue[i]);
	}

      function computeHeight(value) {
	      y = canvas2.height - value * yScale ;
}
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
        float: left;
    }
    #canvas {
        display: none;
    }
    #canvas2 {background: #ffffff;
        box-shadow:5px 5px 5px #ccc;
		    border:5px solid #eee;
		    margin-bottom:10px;}
		    float: right;
		#emotions {
    }
    li {
        display: inline;
        padding: 5px;
    }
    #snapshots {
        float: left;
    }
</style>
