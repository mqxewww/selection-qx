<script lang="ts" setup></script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-blue-600">Home Page</h1>
    <p class="mt-4 text-gray-700">Bienvenue sur la page d’accueil ! 🎉</p>

    <div class="mt-6">
      <router-link class="text-green-500 underline" to="/courses">
        Aller vers Courses →
      </router-link>
      <router-link class="text-blue-500 underline" to="/applications">
        Aller vers Applications →
      </router-link>
    </div>
  </div>
</template>
