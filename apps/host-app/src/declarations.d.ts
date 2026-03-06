declare module "reactApp/mount" {
  export function mount(el: HTMLElement): void;
}

declare module "vueApp/mount" {
  export function mount(el: HTMLElement): () => void;
}