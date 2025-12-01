<script setup>
import Header from "@/components/commons/Header.vue";
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Header -->
        <Header />

        <!-- Main content -->
        <main class="flex-1 p-6 pt-20 bg-background h-full w-screen">
            <router-view />
        </main>
    </div>
</template>
