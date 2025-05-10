// components/MapComponentWrapper.tsx
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default MapComponent;
