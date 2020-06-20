<template>
    <div class="container">
        <div class="row justify-content-center my-3">
            <video ref="video" id="video" width="640" height="480" autoplay></video>
        </div>
        <div class="row justify-content-center my-3">
            <button class="btn btn-success" id="snap" v-on:click="capture()">Snap Photo</button>
        </div>
        <div class="row">
            <canvas ref="canvas" id="canvas" class="d-none" width="640" height="480"></canvas>
        </div>
        <div class="row justify-content-center my-3">
          <div class="p-3 w-50">
            <div id="photoCarousel" class="carousel slide" data-ride="carousel">
               <ol class="carousel-indicators">
                <li data-target="#photoCarousel" v-bind:class="{ active: index==0 }" v-for="(c, index) in captures" v-bind:key="index" :data-slide-to="index" ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item" v-bind:class="{ active: index==0 }" v-for="(c, index) in captures" v-bind:key="index">
                    <img class="d-block w-100" v-bind:src="c" />
                    <div class="carousel-caption d-none d-md-block">
                      <p>Photo {{ ++index }}</p>
                    </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#photoCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#photoCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                video: {},
                canvas: {},
                captures: [],
            }
        },
        mounted() {
            this.video = this.$refs.video;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices.getUserMedia({
                video: true
              }).then(stream => {
                this.video.srcObject = stream;
                this.video.play();
              });
            }
          },
          methods: {
            capture() {
              this.canvas = this.$refs.canvas;
              var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
              this.captures.push(canvas.toDataURL("image/png"));
            },
            isActive() {
              
            }
          }
    }
</script>
