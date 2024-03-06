import React from "react";
import dynamic from "next/dynamic";

const ImageWithPolygons = dynamic(
  () => import("./components/polygons/ImageWithPolygons"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <ImageWithPolygons />;
}
