<script setup lang="ts">
import { ref } from 'vue'
import { sendRequest } from '../content'

async function getAnswer() {
  const answer = await sendRequest()

  showAnswer(answer)
}

function showAnswer(answer: string) {
  const area = document.createElement('textarea')
  area.value = answer
  area.style.position = 'fixed'
  area.style.left = '0'
  area.style.top = '0'
  area.style.backgroundColor = '#fff'
  area.style.height = '200px'
  area.style.width = '200px'
}
</script>

<template>
  <main>
    <h3>Popup Page!</h3>
    <button @click="getAnswer">sendRequest</button>
    <div>
      <a href="https://github.com/syntax-dot" target="_blank">Created by syntax v1.0.0</a>
    </div>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #42b983;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

h6 {
  font-size: 0.5rem;
  color: #999999;
  margin: 0.5rem;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

@media (min-width: 480px) {
  h3 {
    max-width: none;
  }
}

@media (prefers-color-scheme: light) {
  a:hover {
    color: #747bff;
  }

  h6 {
    color: #333333;
  }
}
</style>
