import { useEffect, useRef } from "react";
import { createApp } from "vue";
import VueApp from "vueApp/VueApp";

export default function VueWrapper() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const app = createApp(VueApp);
    app.mount(container.current);

    return () => app.unmount();
  }, []);

  return <div ref={container}></div>;
}