import { useEffect, useRef } from "react";

export default function VueRemote() {
  const ref = useRef<HTMLDivElement>(null);
  const unmountRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    import("vueApp/mount").then((mod) => {
      const mountFn = mod.mount ?? mod.default?.mount ?? mod.default;
      if (ref.current && typeof mountFn === "function") {
        unmountRef.current = mountFn(ref.current);
      }
    });

    return () => unmountRef.current?.();
  }, []);

  return <div ref={ref} />;
}