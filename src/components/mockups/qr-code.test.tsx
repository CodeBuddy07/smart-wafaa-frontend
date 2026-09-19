import { render } from "@testing-library/react";

import { QrCode } from "./qr-code";

describe("QrCode", () => {
  it("is deterministic for the same seed", () => {
    const a = render(<QrCode seed="abc" />).container.innerHTML;
    const b = render(<QrCode seed="abc" />).container.innerHTML;
    expect(a).toBe(b);
  });

  it("differs for different seeds", () => {
    const a = render(<QrCode seed="abc" />).container.innerHTML;
    const b = render(<QrCode seed="xyz" />).container.innerHTML;
    expect(a).not.toBe(b);
  });

  it("exposes an accessible label", () => {
    const { getByRole } = render(<QrCode />);
    expect(getByRole("img", { name: "QR code" })).toBeInTheDocument();
  });
});
