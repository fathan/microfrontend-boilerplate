declare module "@originjs/vite-plugin-federation" {
  interface SharedConfig {
    singleton?: boolean;
    requiredVersion?: string;
    eager?: boolean;
    strictVersion?: boolean;
  }
}

declare module "reactApp/mount" {
  export function mount(el: HTMLElement): void;
}

declare module "vueApp/mount" {
  export function mount(el: HTMLElement): () => void;
}