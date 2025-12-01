<template>
    <header
        class="fixed top-0 left-0 w-full flex items-center bg-white h-14 md:h-20 p-4 md:px-14 md:py-6"
    >
        <img :src="LOGO" alt="Logo" class="h-6 md:h-8 w-auto" />
    </header>
</template>

<script setup>
import LOGO from "@/assets/svgs/logo.svg";
</script>
