import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageWithPolygons from "../ImageWithPolygons";
import { act } from "react-dom/test-utils";
import Konva from "konva";

describe("ImageWithPolygons", () => {
  test("renders without errors", () => {
    render(<ImageWithPolygons />);
    // Assert that the component renders without throwing any errors
  });

  test('displays "No image uploaded" when no image is selected', () => {
    render(<ImageWithPolygons />);
    const noImageText = screen.getByText("No image uploaded");
    expect(noImageText).toBeInTheDocument();
  });

  test('clears the image and boxes when "Clear" button is clicked', async () => {
    render(<ImageWithPolygons />);
    const imageInput = screen.getByLabelText("Upload an image");
    const jsonFileInput = screen.getByLabelText(
      "Upload a JSON file with boxes"
    );
    const clearButton = screen.getByRole("button", { name: "Clear" });

    // Upload an image and a JSON file
    const imageFile = new File(["image content"], "image.jpg", {
      type: "image/jpeg",
    });
    const jsonFile = new File([JSON.stringify({ boxes: [] })], "boxes.json", {
      type: "application/json",
    });
    await userEvent.upload(imageInput, imageFile);
    await userEvent.upload(jsonFileInput, jsonFile);

    // Click the "Clear" button
    fireEvent.click(clearButton);

    // Assert that the image and boxes are cleared
    const uploadedImage = screen.queryByRole("img");
    const polygons = screen.queryAllByRole("line");
    expect(uploadedImage).not.toBeInTheDocument();
    expect(polygons).toHaveLength(0);
  });
});
