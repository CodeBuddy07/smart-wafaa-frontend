import { render, screen } from "@testing-library/react";

import { AppleStoreCard, GoogleLoyaltyCard } from "./wallet-pass";

describe("AppleStoreCard", () => {
  it("renders logo text, header, primary, fields and barcode alt text in order", () => {
    render(
      <AppleStoreCard
        logoText="Roast & Brew"
        header={{ label: "Stamps", value: "9/10" }}
        primary={{ label: "Coffee stamps", value: "9 of 10" }}
        strip={<div data-testid="strip" />}
        fields={[{ label: "Member", value: "Khaled" }]}
        barcodeAlt="4521 8830 1120"
      />,
    );
    const text = document.body.textContent ?? "";
    expect(text.indexOf("Roast & Brew")).toBeLessThan(text.indexOf("9 of 10"));
    expect(text.indexOf("9 of 10")).toBeLessThan(text.indexOf("Khaled"));
    expect(text.indexOf("Khaled")).toBeLessThan(text.indexOf("4521 8830 1120"));
    expect(screen.getByTestId("strip")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "QR code" })).toBeInTheDocument();
  });

  it("scales its corner radius from the 375pt reference", () => {
    const { container } = render(
      <AppleStoreCard
        width={375}
        logoText="x"
        header={{ label: "a", value: "b" }}
        primary={{ label: "c", value: "d" }}
        strip={null}
        fields={[]}
        barcodeAlt="e"
      />,
    );
    expect(parseFloat((container.firstChild as HTMLElement).style.borderRadius)).toBe(10);
  });
});

describe("GoogleLoyaltyCard", () => {
  it("shows issuer, programme, two rows and the barcode alt text", () => {
    render(
      <GoogleLoyaltyCard
        logo={<span />}
        issuerName="Nakheel Boutiques"
        programName="Nakheel Rewards"
        rows={[
          { label: "Points", value: "2,480" },
          { label: "Rewards", value: "1 available" },
          { label: "Ignored", value: "third row" },
        ]}
        barcodeAlt="NB-88410-227"
      />,
    );
    expect(screen.getByText("Nakheel Boutiques")).toBeInTheDocument();
    expect(screen.getByText("Nakheel Rewards")).toBeInTheDocument();
    expect(screen.getByText("2,480")).toBeInTheDocument();
    expect(screen.queryByText("third row")).toBeNull(); // default template shows two rows
    expect(screen.getByText("NB-88410-227")).toBeInTheDocument();
  });
});
