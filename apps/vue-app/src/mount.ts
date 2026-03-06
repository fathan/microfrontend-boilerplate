import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import './style.css'
import App from "./App.vue";
import List from "./pages/User/List.vue";
import Create from "./pages/User/Create.vue";
import Detail from "./pages/User/Detail.vue";
import Edit from "./pages/User/Edit.vue";

export function mount(el: HTMLElement, basePath: string = "/") {
  // ← Simpan PALING AWAL sebelum apapun
  const initialPath = window.location.pathname.replace(basePath, "") || "/";
  console.log("captured initialPath:", initialPath);

  const router = createRouter({
    history: createMemoryHistory(basePath),
    routes: [
      { path: "/",         component: List },
      { path: "/create",   component: Create },
      { path: "/:id",      component: Detail },
      { path: "/edit/:id", component: Edit },
    ],
  });

  router.afterEach((to) => {
    const base = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
    const path = to.fullPath.startsWith("/") ? to.fullPath : `/${to.fullPath}`;
    const fullPath = base + path;

    if (window.location.pathname !== fullPath) {
      window.history.pushState({}, "", fullPath);
    }
  });

  const onPopState = () => {
    const path = window.location.pathname.replace(basePath, "") || "/";
    router.push(path);
  };
  window.addEventListener("popstate", onPopState);

  const app = createApp(App);
  app.use(router);
  app.mount(el);

  router.isReady().then(() => {
    console.log("replacing to:", initialPath);
    router.replace(initialPath).then(() => {
      console.log("after replace currentRoute:", router.currentRoute.value.fullPath);
      console.log("matched components:", router.currentRoute.value.matched);
    });
  });

  return () => {
    window.removeEventListener("popstate", onPopState);
    app.unmount();
  };
}