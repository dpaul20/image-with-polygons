"use client";
import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { files } from "@/lib/constant";
import { Polygon } from "@/types/polygon";

/**
 * Component that displays an image with polygons.
 */
function ImageWithPolygons() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [boxes, setBoxes] = useState<Polygon[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex w-full flex-col justify-center gap-11 p-2 max-w-screen-sm md:max-w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-4">
        {image ? (
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            className="border border-gray-200"
          >
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
        ) : (
          <div className="flex h-96  w-full items-center justify-center bg-gray-200 md:w-1/2">
            No image uploaded
          </div>
        )}
        <Card className="w-full md:max-w-screen-sm">
          <CardHeader>
            <CardTitle>Image with polygons</CardTitle>
            <CardDescription>
              Upload an image and a JSON file with boxes to display the image
              with polygons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">Upload an image</Label>
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="jsonFile">
                    Upload a JSON file with boxes
                  </Label>
                  <Input
                    ref={jsonFileInputRef}
                    type="file"
                    accept="application/json"
                    onChange={handleLoadBoxes}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="reset"
              onClick={() => {
                setImage(null);
                setBoxes([]);
                if (imageInputRef.current) imageInputRef.current.value = "";
                if (jsonFileInputRef.current)
                  jsonFileInputRef.current.value = "";
              }}
            >
              Clear
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mx-auto flex w-full items-center justify-center md:max-w-screen-sm">
        <Table className=" bg-white rounded-md text-center">
          <TableCaption>A list of files and images</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">File</TableHead>
              <TableHead className="text-center">Src</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.name}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.src}</TableCell>
                <TableCell>
                  <Link
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    href={file.src}
                    target="_blank"
                    download={
                      file.src.endsWith(".json")
                        ? file.name + ".json"
                        : file.name + ".jpg"
                    }
                  >
                    Download
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ImageWithPolygons;
