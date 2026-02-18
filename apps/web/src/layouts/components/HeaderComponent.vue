<script setup lang="ts"></script>

<template>
  <header class="fixed top-0 right-0 left-0 z-50 w-full">
    <div
      class="relative m-4 flex items-center justify-center space-x-4 text-sm"
    >
      <img
        width="50"
        height="50"
        src="/favicon.svg"
        alt="icon"
        class="absolute rounded-2xl"
        loading="eager"
      />
      <div
        class="flex space-x-16 rounded-2xl bg-gray-700 bg-linear-to-tl from-zinc-700 to-zinc-600 px-8 py-2 lg:space-x-20 lg:px-12"
      >
        <RouterLink
          to="/courses"
          class="font-medium text-zinc-400 transition-colors text-shadow-lg [&.router-link-active]:text-blue-300"
        >
          <p>FORMATIONS</p>
        </RouterLink>

        <RouterLink
          to="/applications"
          class="font-medium text-zinc-400 transition-colors text-shadow-lg [&.router-link-active]:text-blue-300"
        >
          <p>CANDIDATURES</p>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
