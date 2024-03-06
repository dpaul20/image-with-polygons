"use client";
import React, { useState } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";

interface Polygon {
  box: {
    topX: number;
    topY: number;
    bottomX: number;
    bottomY: number;
  };
  label: string;
  score: number;
  polygon: number[][];
}

/**
 * Component that displays an image with polygons.
 */
const ImageWithPolygons: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [boxes, setBoxes] = useState<Polygon[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const img = new window.Image();
          img.src = reader.result;
          img.onload = () => {
            setDimensions({ width: img.width, height: img.height });
            setImage(img);
          };
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleLoadBoxes = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const data = JSON.parse(reader.result);
          setBoxes(data.boxes);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1>Image with polygons</h1>
      <p>Upload an image and a JSON file with boxes</p>
      <h2>Upload an image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <h2>Upload a JSON file with boxes</h2>
      <input type="file" accept="application/json" onChange={handleLoadBoxes} />
      {image && (
        <Stage width={dimensions.width} height={dimensions.height}>
          <Layer>
            <KonvaImage image={image} />
            {boxes.map((box, i) => (
              <Line
                key={`box-${i}`}
                points={box.polygon.flat()}
                fill="red"
                closed
                scaleX={dimensions.width}
                scaleY={dimensions.height}
              />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default ImageWithPolygons;
