<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useSavingGoalStore } from "@/stores/savingGoalStore";
import { formatMoneyDisplay } from "@/utils/price";
import { formatMonthYear } from "@/utils/date";

// Assets
import HOUSE from "@/assets/svgs/saving/house.svg";
import PRICE from "@/assets/svgs/saving/price.svg";
import LEFT from "@/assets/svgs/saving/left-arrow.svg";
import RIGHT from "@/assets/svgs/saving/right-arrow.svg";

const store = useSavingGoalStore();
const reachDateRef = ref<HTMLDivElement | null>(null);

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const sanitized = target.value.replace(/[^\d.]/g, "");
    store.updateTotalAmountFromInput(sanitized);
};

const increment = () => {
    store.incrementMonth();
    // Avoid ref out of container
    reachDateRef.value?.focus();
};

const decrement = () => {
    store.decrementMonth();
    reachDateRef.value?.focus();
};

// Handle ref for container
const handleKeyDown = (event: KeyboardEvent) => {
    if (!reachDateRef.value) return;

    const isFocused = document.activeElement === reachDateRef.value;
    if (!isFocused) return;

    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            decrement();
            break;
        case "ArrowRight":
            event.preventDefault();
            increment();
            break;
    }
};

// Just allow number and dots
const onKeyDown = (e: KeyboardEvent) => {
    const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
    ];

    if (/[0-9]/.test(e.key) || allowedKeys.includes(e.key)) {
        return;
    }

    if (e.key === ".") {
        const target = e.target as HTMLInputElement;
        if (!target.value.includes(".")) return;
    }

    e.preventDefault();
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

const depositSummary = computed(() => {
    const goal = store.currentGoal;
    const months = store.totalMonths;
    const total = formatMoneyDisplay(goal.totalAmount);

    const targetMonth = goal.reachDate
        ? formatMonthYear(goal.reachDate, { month: "long" }).month
        : "";
    const targetYear = goal.reachDate
        ? formatMonthYear(goal.reachDate, { month: "long" }).year
        : "";

    return `You’re planning <strong>${months} monthly deposits</strong> to reach your <strong>$${total}</strong> goal by <strong>${targetMonth} ${targetYear}</strong>.`;
});
</script>

<template>
    <div
        class="w-full md:w-[560px] flex flex-col gap-4 md:gap-6 rounded-lg mx-auto bg-white p-6 shadow-[0_16px_32px_0_#1E2A3214] md:px-10 md:pt-8 md:pb-10"
    >
        <section class="flex gap-4 items-center">
            <img :src="HOUSE" alt="house icon" class="size-16" />
            <div class="flex flex-col gap-1">
                <h1 class="text-xl md:text-2xl font-rubik font-medium">
                    Buy a house
                </h1>
                <span class="font-normal text-sm md:text-base text-[#708797]"
                    >Saving goal</span
                >
            </div>
        </section>

        <section class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-68">
                <span class="text-xs md:text-sm font-normal mb-1 block"
                    >Total amount</span
                >
                <div class="relative">
                    <span
                        class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
                    >
                        <img :src="PRICE" alt="house icon" class="size-6" />
                    </span>

                    <input
                        type="text"
                        :value="store.currentGoal.totalAmountInput"
                        @input="onInput($event)"
                        @keydown="onKeyDown($event)"
                        pattern="^\d*\.?\d*$"
                        maxlength="10"
                        class="h-14 w-full pl-11 border border-[#E9EEF2] rounded-sm text-xl md:text-2xl text-[#4D6475] font-medium focus:outline-none"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div class="flex-1">
                <span class="text-xs md:text-sm font-normal mb-1"
                    >Reach goal by</span
                >
                <div
                    class="h-14 w-full border justify-between border-[#E9EEF2] rounded-sm flex focus:outline-none"
                    ref="reachDateRef"
                    tabindex="0"
                >
                    <button
                        @click="decrement"
                        class="grid place-items-center w-12 cursor-pointer focus:outline-none hover-scale"
                    >
                        <img :src="LEFT" alt="house icon" class="size-6" />
                    </button>
                    <div
                        class="flex flex-col items-center justify-center text-sm md:text-base"
                    >
                        <h3 class="font-semibold">
                            {{ store.reachDateDisplay.month }}
                        </h3>
                        <p>{{ store.reachDateDisplay.year }}</p>
                    </div>
                    <button
                        @click="increment"
                        class="grid place-items-center w-12 cursor-pointer focus:outline-none hover-scale"
                    >
                        <img :src="RIGHT" alt="house icon" class="size-6" />
                    </button>
                </div>
            </div>
        </section>

        <section class="w-full border-[#E9EEF2] border rounded-lg">
            <div
                class="flex justify-between items-center p-6 md:px-8 md:pt-6 md:pb-4"
            >
                <h1 class="text-lg md:text-xl font-normal">Monthly amount</h1>
                <h2
                    class="font-rubik font-medium text-2xl md:text-[32px] text-secondary"
                >
                    ${{ formatMoneyDisplay(store.currentGoal.monthlyAmount) }}
                </h2>
            </div>

            <div class="w-full bg-background p-6 md:py-6 md:px-8">
                <p
                    class="text-xs font-normal text-center"
                    v-html="store.depositSummary"
                ></p>
            </div>
        </section>

        <button
            @click="store.calculateMonthly()"
            class="w-80 h-14 cursor-pointer mt-4 md:mt-2 mx-auto bg-primary text-white font-semibold rounded-4xl hover-scale"
        >
            Confirm
        </button>
    </div>
</template>
