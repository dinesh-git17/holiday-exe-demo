import { render, screen } from "@testing-library/react";

import { HeroSection } from "../HeroSection";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: { alt: string; src: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: function MockMotionDiv({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) {
      return <div className={className}>{children}</div>;
    },
  },
}));

// Mock canvas for MatrixRain
HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

describe("HeroSection", () => {
  it("renders the title", () => {
    render(<HeroSection />);

    expect(screen.getByText("HOLIDAY.EXE")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection />);

    expect(screen.getByText("North Pole Connection")).toBeInTheDocument();
  });

  it("renders the scroll indicator", () => {
    render(<HeroSection />);

    expect(screen.getByText("[ SCROLL TO EXPLORE ]")).toBeInTheDocument();
  });

  it("renders the splash screen image", () => {
    render(<HeroSection />);

    const splashImage = screen.getByAltText(
      "North Pole Connection splash screen"
    );
    expect(splashImage).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSection className="custom-class" />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
