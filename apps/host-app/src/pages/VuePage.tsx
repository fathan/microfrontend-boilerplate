import RemoteWrapper from "../components/RemoteWrapper";

export default function VuePage() {
  return (
    <RemoteWrapper
      name="VueApp"
      loader={() => import("vueApp/mount") as any}
      basePath="/vue-app"
    />
  );
}