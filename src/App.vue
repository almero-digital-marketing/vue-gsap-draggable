<template>
    <div class="item">
        <button @click="progress = .5">Center</button>
        {{ progress }}
        <Draggable v-slot="drag" name="drag1" class="drag1" v-model="progress" :velocity="true">
          <div class="circle">{{ Math.round(drag.velocity * 100)/100 }}</div>
        </Draggable>
        <Draggable name="drag2" class="drag2" v-model="progress" :edgeResistance="1">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </Draggable>
        <Draggable name="drag3" class="drag3" v-model="progress" :inertia="false"></Draggable>
        <Draggable v-slot="rotate" name="rotate1" class="rotate1" type="rotation" v-model="progress">
          <div class="circle">{{ Math.round(rotate.progress * 100)/100 }}</div>
        </Draggable>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const progress = ref(.5)
</script>
<style>
.rotate1 {
  height: 20vw;
  width: 20vw !important;
  position: fixed;
  top: 400px;
  left: 40vw;
  border: 1px solid lightgrey;
  border-radius: 50%;
}

.rotate1 .handle {
  position: relative;
  border: 1px solid gold;
}

.rotate1 .circle {
  position: absolute;
  top: calc(50% - 8px);
  width: 100%;
  text-align: center;
}

.drag1.scrubber {
  display: block;
  position: fixed;
  top: 50px;
  left: 10vw;
  width: 80vw !important;
  height: 80px;
  border: solid 1px black;
  margin: 0 auto;
}

.drag1 .handle {
  display: block;
  position: relative;
  width: 80px;
}

.drag1 .circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, red, blue);
  border-radius: 50%;
  transform: rotate(calc(-120deg * var(--velocity-drag1)));
  line-height: 80px;
  text-align: center;
  font-size: 36px;
}

.drag2.scrubber {
  display: block;
  position: fixed;
  top: 200px;
  left: 10vw;
  width: 80vw !important;
  height: 80px;
  border: solid 1px black;
  margin: 0 auto;
  overflow: hidden;
}

.drag2 .handle {
  display: flex;
  position: relative;
  width: 200vw;
  background: linear-gradient(to left, red, blue)
}

.drag3.scrubber {
  display: block;
  position: fixed;
  top: 300px;
  left: 25vw;
  width: 50vw !important;
  height: 80px;
  border: solid 1px black;
  margin: 0 auto;
  overflow: hidden;
}

.drag3 .handle {
  display: block;
  position: relative;
  width: 10px;
  background: green;
}

.item {
  border: 1px solid gold;
  height: 100%;
  width: 100%;
}

.scrubber {
  transition: all .2s;
}
.scrubber.dragging {
  border: 1px solid red;
}
</style>