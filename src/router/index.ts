import { createRouter, createWebHistory } from "vue-router";

import SavingGoalView from "@/views/SavingGoalView.vue";

const routes = [
  {
    path: "/",
    name: "saving-goal",
    component: SavingGoalView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
