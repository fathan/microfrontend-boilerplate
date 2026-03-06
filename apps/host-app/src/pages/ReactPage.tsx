import RemoteWrapper from "../components/RemoteWrapper";

export default function ReactPage() {
  return (
    <RemoteWrapper
      name="ReactApp"
      loader={() => import("reactApp/mount") as any}
      basePath="/react-app"
    />
  );
}