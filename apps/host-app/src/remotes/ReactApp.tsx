import { useEffect, useRef } from "react";

export default function ReactRemote() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("reactApp/mount").then((mod) => {
      // handle both named dan default export
      const mountFn = mod.mount ?? mod.default?.mount ?? mod.default;
      if (ref.current && typeof mountFn === "function") {
        mountFn(ref.current);
      }
    });
  }, []);

  return <div ref={ref} />;
}