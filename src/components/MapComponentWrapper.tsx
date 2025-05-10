// components/MapComponentWrapper.tsx
import dynamic from "next/dynamic";

const MapComponent = dynamic(
  () => import("../../app/ui/components/_MapComponent/MapComponent"),
  {
    ssr: false,
  }
);

export default MapComponent;
