<template>
  <main class="container min-h-screen mx-auto py-8 flex flex-col justify-center items-center">
    <h1 class="mb-4 text-5xl leading-none text-blue-darker">{{ error.statusCode }}</h1>
    <h2 class="mb-4">{{error.message}}</h2>
    <nuxt-link to="/" class="btn btn-blue">Back to home</nuxt-link>
  </main>
</template>

<script>
export default {
  props: ['error']
}
</script>
