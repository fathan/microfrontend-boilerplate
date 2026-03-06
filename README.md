# Microfrontend Boilerplate

A production-ready Microfrontend boilerplate using **Vite Module Federation** with a React host, React remote, and Vue remote — all in TypeScript.

---

## Tech Stack

| App | Framework | Port |
|-----|-----------|------|
| `host-app` | React + TypeScript + Vite | 5175 |
| `react-app` | React + TypeScript + Vite | 5176 |
| `vue-app` | Vue 3 + TypeScript + Vite | 5177 |

**Shared tooling:** Tailwind CSS v4, `@originjs/vite-plugin-federation`, pnpm workspaces

---

## Project Structure

```
microfrontend-boilerplate/
├── apps/
│   ├── host-app/               # Shell — routing, layout, auth
│   │   └── src/
│   │       ├── layouts/
│   │       │   └── CmsLayout.tsx       # Sidebar + Header + main content
│   │       ├── components/
│   │       │   ├── Sidebar.tsx
│   │       │   ├── Header.tsx
│   │       │   └── RemoteWrapper.tsx   # Generic remote loader
│   │       ├── pages/
│   │       │   ├── DashboardPage.tsx
│   │       │   ├── ReactPage.tsx       # Mounts react-app remote
│   │       │   └── VuePage.tsx         # Mounts vue-app remote
│   │       ├── router.tsx
│   │       ├── declarations.d.ts       # Remote module types
│   │       └── main.tsx
│   ├── react-app/              # React remote — owns its own domain + routing
│   │   └── src/
│   │       └── mount.tsx               # Entry point exposed via federation
│   └── vue-app/                # Vue remote — owns its own domain + routing
│       └── src/
│           └── mount.ts                # Entry point exposed via federation
└── packages/                   # Shared packages (api, store, ui, tailwind-config)
```

---

## Getting Started

> **Important:** `@originjs/vite-plugin-federation` only works with **built output**, not `vite dev`. All apps must be built and served via `vite preview`.

### 1. Install dependencies

```bash
# From root
pnpm install

# Or per app
cd apps/react-app && npm install
cd apps/vue-app && npm install
cd apps/host-app && npm install
```

### 2. Build & run remotes first

```bash
# Terminal 1 — React remote
cd apps/react-app
npm run build && npm run preview

# Terminal 2 — Vue remote
cd apps/vue-app
npm run build && npm run preview
```

### 3. Build & run host (after remotes are up)

```bash
# Terminal 3
cd apps/host-app
npm run build && npm run preview
```

### 4. Open in browser

```
http://localhost:5175
```

---

## Routing

Routing lives entirely in `host-app`. Each remote owns its own **internal** sub-routes.

```
host-app router
├── /                  → DashboardPage     (host-owned)
├── /react-app/*       → ReactPage         (mounts react-app remote)
└── /vue-app/*         → VuePage           (mounts vue-app remote)
```

### Internal routing inside remotes

Each remote handles its own sub-routes independently. The host only knows the top-level prefix.

**react-app** uses `createBrowserRouter` with `basename`:

```typescript
// react-app/src/mount.tsx
export function mount(el: HTMLElement, basePath = "/react-app") {
  const router = createBrowserRouter([
    { path: "/",         element: <List /> },
    { path: "/create",   element: <Form mode="create" /> },
    { path: "/:id",      element: <Detail /> },
    { path: "/edit/:id", element: <Form mode="edit" /> },
  ], { basename: basePath });

  ReactDOM.createRoot(el).render(<RouterProvider router={router} />);
}
```

**vue-app** uses `createWebHistory` with base:

```typescript
// vue-app/src/mount.ts
export function mount(el: HTMLElement, basePath = "/vue-app") {
  const router = createRouter({
    history: createWebHistory(basePath),
    routes: [
      { path: "/",         component: List },
      { path: "/create",   component: Form, props: { mode: "create" } },
      { path: "/:id",      component: Detail },
      { path: "/edit/:id", component: Form, props: { mode: "edit" } },
    ],
  });

  const app = createApp(App);
  app.use(router);
  app.mount(el);

  return () => app.unmount();
}
```

---

## Adding a New Remote

### 1. Create the remote app

```bash
npm create vite@latest new-app -- --template react-ts
```

### 2. Configure `vite.config.ts`

```typescript
federation({
  name: "newApp",
  filename: "remoteEntry.js",
  exposes: { "./mount": "./src/mount.tsx" },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } },
})
```

### 3. Register in host `vite.config.ts`

```typescript
remotes: {
  reactApp: "http://localhost:5176/assets/remoteEntry.js",
  vueApp:   "http://localhost:5177/assets/remoteEntry.js",
  newApp:   "http://localhost:5178/assets/remoteEntry.js", // add this
}
```

### 4. Add type declaration in `host-app/src/declarations.d.ts`

```typescript
declare module "newApp/mount" {
  export function mount(el: HTMLElement, basePath?: string): void;
}
```

### 5. Add route & page in host

```typescript
// router.tsx
{ path: "new-app/*", element: <NewAppPage /> }
```

```typescript
// pages/NewAppPage.tsx
export default function NewAppPage() {
  return (
    <RemoteWrapper
      name="NewApp"
      loader={() => import("newApp/mount") as any}
      basePath="/new-app"
    />
  );
}
```

### 6. Add nav item in `Sidebar.tsx`

```typescript
{ to: "/new-app", label: "New App", icon: <YourIcon /> }
```

---

## Tailwind CSS

Each app runs its own Tailwind instance. They are **independent** and do not share styles at runtime.

```css
/* Each app's entry CSS */
@import "tailwindcss";
```

Tailwind v4 syntax — no `tailwind.config.js` needed. The `@tailwindcss/vite` plugin auto-detects content.

| App | Entry CSS |
|-----|-----------|
| `host-app` | `src/index.css` |
| `react-app` | `src/App.css` |
| `vue-app` | `src/style.css` |

---

## Inter-app Communication

Apps must **never** import directly from each other. Communication goes through:

```
Custom Events          → fire-and-forget, framework-agnostic
URL / Query Params     → state that needs to be shareable/bookmarkable
packages/store         → shared global state (auth, theme, user)
packages/api           → shared HTTP client with auth interceptors
```

### Example — emit event from vue-app, listen in react-app

```typescript
// vue-app: emit
window.dispatchEvent(new CustomEvent("mfe:order-created", {
  detail: { orderId: "123" }
}));

// react-app: listen
useEffect(() => {
  const handler = (e: Event) => {
    const { orderId } = (e as CustomEvent).detail;
    // handle event
  };
  window.addEventListener("mfe:order-created", handler);
  return () => window.removeEventListener("mfe:order-created", handler);
}, []);
```

---

## Shared Packages

Located in `packages/` and consumed by any app via workspace imports.

| Package | Purpose |
|---------|---------|
| `@mfe/api` | Axios instance with auth interceptors |
| `@mfe/store` | Global state via Custom Events |
| `@mfe/ui` | Framework-agnostic Web Components |
| `@mfe/tailwind-config` | Shared Tailwind base config |

Install in an app:

```bash
pnpm add @mfe/api --filter react-app
```

---

## Common Issues

### Remote fails to load (`mod.mount is not a function`)

Federation sometimes wraps exports. `RemoteWrapper` handles this automatically:

```typescript
const mountFn = mod.mount ?? mod.default?.mount ?? mod.default;
```

### Styles not applying

- Ensure `@import "tailwindcss"` (v4 syntax) is in each app's entry CSS — **not** the v3 `@tailwind` directives.
- Ensure the CSS file is imported in the entry point (`main.tsx` / `mount.tsx`).

### `requiredVersion` warning in console

Remove hardcoded versions from shared config — let federation auto-detect from `package.json`:

```typescript
// ✅
shared: { react: { singleton: true } } as any

// ❌
shared: { react: { singleton: true, requiredVersion: "^18.0.0" } }
```

### TypeScript error on `singleton` property

Add an augmentation file at the project root:

```typescript
// federation.d.ts
declare module "@originjs/vite-plugin-federation" {
  interface SharedConfig {
    singleton?: boolean;
    requiredVersion?: string;
    eager?: boolean;
  }
}
```

---

## Key Principles

- **Federation is for UI** — use `packages/` for shared logic, never share logic via federation
- **Always build before preview** — `vite dev` does not support module federation
- **Remotes are independent** — each remote can be deployed without redeploying the host
- **Host owns top-level routing** — remotes own everything under their prefix
- **No direct cross-remote imports** — communicate only via Custom Events or URL