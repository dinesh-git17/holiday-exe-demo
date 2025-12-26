import { render, screen } from "@testing-library/react";

import { PhoneFrame } from "../PhoneFrame";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: { alt: string; src: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} data-testid="phone-frame" />;
  },
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: function MockMotionDiv({
      children,
      className,
      style,
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }) {
      return (
        <div className={className} style={style}>
          {children}
        </div>
      );
    },
  },
}));

describe("PhoneFrame", () => {
  it("renders children content", () => {
    render(
      <PhoneFrame>
        <div data-testid="child-content">Test Content</div>
      </PhoneFrame>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders the iPhone frame image", () => {
    render(
      <PhoneFrame>
        <div>Content</div>
      </PhoneFrame>
    );

    expect(screen.getByTestId("phone-frame")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PhoneFrame className="custom-phone">
        <div>Content</div>
      </PhoneFrame>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-phone");
  });

  it("applies scale to dimensions", () => {
    const { container } = render(
      <PhoneFrame scale={0.5}>
        <div>Content</div>
      </PhoneFrame>
    );

    const wrapper = container.firstChild as HTMLElement;
    // Default width is 280, scaled by 0.5 = 140
    expect(wrapper.style.width).toBe("140px");
  });
});
