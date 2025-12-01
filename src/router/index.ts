import { createRouter, createWebHistory } from "vue-router";
import SavingGoalView from "@/views/SavingGoalView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "",
                name: "saving-goal",
                component: SavingGoalView,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
