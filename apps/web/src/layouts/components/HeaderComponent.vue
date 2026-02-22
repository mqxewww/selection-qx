<script setup lang="ts"></script>

<template>
  <header class="fixed top-0 right-0 left-0 z-50 w-full">
    <div class="flex justify-center px-4 pt-4">
      <nav
        class="relative flex items-center gap-1 rounded-2xl border border-zinc-700/50 bg-zinc-900/80 px-2 py-2 shadow-xl shadow-black/30 backdrop-blur-md"
      >
        <RouterLink
          to="/courses"
          class="group relative flex items-center gap-2.5 rounded-xl px-4 py-2 transition-all duration-200 [&.router-link-active]:bg-zinc-800"
        >
          <span
            class="text-[11px] font-bold tracking-widest text-zinc-400 uppercase transition-colors group-hover:text-zinc-200 group-[.router-link-active]:text-zinc-100"
          >
            Formations
          </span>
          <span
            class="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-400 opacity-0 transition-opacity group-[.router-link-active]:opacity-100"
          />
        </RouterLink>

        <div class="flex items-center px-1">
          <div class="h-5 w-px bg-zinc-700/60" />
          <img
            width="36"
            height="36"
            src="/favicon.svg"
            alt="icon"
            class="mx-3"
            loading="eager"
          />
          <div class="h-5 w-px bg-zinc-700/60" />
        </div>

        <RouterLink
          to="/applications"
          class="group relative flex items-center gap-2.5 rounded-xl px-4 py-2 transition-all duration-200 [&.router-link-active]:bg-zinc-800"
        >
          <span
            class="text-[11px] font-bold tracking-widest text-zinc-400 uppercase transition-colors group-hover:text-zinc-200 group-[.router-link-active]:text-zinc-100"
          >
            Candidatures
          </span>
          <span
            class="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-400 opacity-0 transition-opacity group-[.router-link-active]:opacity-100"
          />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
