<script setup>
import Header from "@/components/commons/Header.vue";
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Header -->
        <Header />

        <!-- Main content -->
        <main
            class="font-sans flex-1 md:p-6 pt-14 md:pt-20 bg-background h-full w-screen mt-8 md:mt-12"
        >
            <router-view />
        </main>
    </div>
</template>
