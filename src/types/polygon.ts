export interface Polygon {
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
