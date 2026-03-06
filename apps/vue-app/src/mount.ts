import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import './style.css'
import App from "./App.vue";

export function mount(el: HTMLElement) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/",         component: () => import("./pages/User/List.vue") },
      { path: "/create",   component: () => import("./pages/User/Create.vue") },
      { path: "/:id",      component: () => import("./pages/User/Detail.vue") },
      { path: "/edit/:id", component: () => import("./pages/User/Edit.vue") },
    ],
  });
  
  const app = createApp(App);

  app.use(router);
  app.mount(el);

  return () => app.unmount();
}