<template>
  <header class="bg-blue-darker px-4 fixed w-full pin-t z-10">
    <nav class="flex items-center justify-between py-4 mx-auto container flex-wrap">
      <div class="flex items-center text-white mr-3">
        <nuxt-link to="/" class="leading-none no-underline font-semibold text-2xl lg:text-3xl text-white">Users List</nuxt-link>
      </div>

      <div class="flex">
        <a href="/" class="btn btn-transparent hidden md:block">GitHub</a>
        <a href="/dota" class="btn btn-transparent ml-2 lg:ml-4">Dota</a>
      </div>
    </nav>
  </header>
</template>
