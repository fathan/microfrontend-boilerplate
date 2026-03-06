<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 space-y-8">
    <!-- Title -->
    <h1 class="text-4xl font-bold text-gray-800">{{ msg }}</h1>

    <!-- Card -->
    <div class="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center gap-4">
      <button
        type="button"
        @click="count++"
        class="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        count is {{ count }}
      </button>
      <p class="text-gray-600 text-center">
        Edit <code class="bg-gray-100 px-1 rounded">components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <!-- Links -->
    <div class="text-center space-y-2 text-gray-700">
      <p>
        Check out
        <a
          href="https://vuejs.org/guide/quick-start.html#local"
          target="_blank"
          class="text-blue-500 hover:underline"
          >create-vue</a
        >, the official Vue + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
          class="text-blue-500 hover:underline"
          >Vue Docs Scaling up Guide</a
        >.
      </p>
    </div>

    <!-- Footer -->
    <p class="text-gray-500 mt-4">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>