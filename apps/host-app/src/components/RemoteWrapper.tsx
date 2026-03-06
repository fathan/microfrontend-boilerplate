import { useEffect, useRef, useState } from "react";

interface RemoteWrapperProps {
  loader: () => Promise<{ mount: (el: HTMLElement) => (() => void) | void }>;
  name: string;
  basePath?: string;
}

type Status = "loading" | "mounted" | "error";

export default function RemoteWrapper({ loader, name, basePath }: RemoteWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const unmountRef = useRef<(() => void) | undefined>(undefined);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");
   const loaderRef = useRef(loader);
  const nameRef = useRef(name);
  const basePathRef = useRef(basePath);

  useEffect(() => {
    basePathRef.current = basePath;
  }, [basePath]);

  useEffect(() => {
    let cancelled = false;

    loaderRef.current()
      .then((mod: any) => {
        if (cancelled || !ref.current) return;

        const mountFn = mod.mount ?? mod.default?.mount ?? mod.default;

        if (typeof mountFn !== "function") {
          throw new Error(`Remote "${nameRef.current}" does not export a mount() function`);
        }

        const result = mountFn(ref.current, basePathRef.current); // ← pass basePath
        if (typeof result === "function") {
          unmountRef.current = result;
        }

        setStatus("mounted");
      })
      .catch((err: Error) => {
        if (cancelled) return;
        console.error(`[RemoteWrapper] Failed to load "${nameRef.current}":`, err);
        setErrorMsg(err.message ?? "Unknown error");
        setStatus("error");
      });

    return () => {
      cancelled = true;
      unmountRef.current?.();
    };
  }, []); 

  return (
    <div className="relative min-h-50">
      {/* Loading state */}
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-sm">Loading {name}...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
            <svg className="w-8 h-8 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-red-700 font-medium text-sm mb-1">Failed to load {name}</p>
            <p className="text-red-500 text-xs font-mono break-all">{errorMsg}</p>
            <p className="text-gray-400 text-xs mt-3">Pastikan remote sudah running dan dapat diakses</p>
          </div>
        </div>
      )}

      {/* Mount target — selalu ada di DOM */}
      <div
        ref={ref}
        className={status !== "mounted" ? "invisible" : ""}
      />
    </div>
  );
}