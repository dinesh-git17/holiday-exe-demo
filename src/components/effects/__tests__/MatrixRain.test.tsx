import { render } from "@testing-library/react";

import { MatrixRain } from "../MatrixRain";

// Mock canvas context
const mockGetContext = jest.fn(() => ({
  fillStyle: "",
  font: "",
  fillRect: jest.fn(),
  fillText: jest.fn(),
}));

HTMLCanvasElement.prototype.getContext =
  mockGetContext as unknown as typeof HTMLCanvasElement.prototype.getContext;

describe("MatrixRain", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders a canvas element", () => {
    const { container } = render(<MatrixRain />);

    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<MatrixRain className="custom-canvas" />);

    const canvas = container.querySelector("canvas");
    expect(canvas).toHaveClass("custom-canvas");
  });

  it("applies opacity style", () => {
    const { container } = render(<MatrixRain opacity={0.5} />);

    const canvas = container.querySelector("canvas");
    expect(canvas).toHaveStyle({ opacity: "0.5" });
  });

  it("has aria-hidden for accessibility", () => {
    const { container } = render(<MatrixRain />);

    const canvas = container.querySelector("canvas");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("initializes canvas context", () => {
    render(<MatrixRain />);

    expect(mockGetContext).toHaveBeenCalledWith("2d");
  });
});
