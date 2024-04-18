"use client";
import React, { useState } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="flex h-[calc(100vh)] w-full items-center">
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
      <Card className="max-w-screen-sm">
        <CardHeader>
          <CardTitle>Image with polygons</CardTitle>
          <CardDescription>
            Upload an image and a JSON file with boxes to display the image with
            polygons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Upload an image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jsonFile">Upload a JSON file with boxes</Label>
                <Input
                  type="file"
                  accept="application/json"
                  onChange={handleLoadBoxes}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageWithPolygons;
