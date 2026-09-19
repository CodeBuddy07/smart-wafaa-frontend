import { expect, test } from "@playwright/test";

test.describe("landing page", () => {
  test("renders the hero and primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "The Smart Way To Reward Customers.",
    );
    await expect(page.getByRole("link", { name: /get free merchant account/i })).toBeVisible();
  });

  test("exposes every section anchor used by the header nav", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "features",
      "how-it-works",
      "card-programme",
      "pricing",
      "faq",
      "get-started",
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("how-it-works: selecting a step focuses its card", async ({ page, isMobile }) => {
    await page.goto("/");
    await page.locator("#how-it-works").scrollIntoViewIfNeeded();
    await page.getByRole("tab", { name: /brand/i }).click();
    await expect(page.getByRole("tab", { name: /brand/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    if (!isMobile) {
      await expect(
        page.getByRole("button", { name: /step 3: brand & customise/i }),
      ).toHaveAttribute("aria-pressed", "true");
    }
  });

  test("wallet preview switches between Apple and Google renders", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#wallet-preview");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("tab", { name: /apple wallet/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(section.getByText("Roast & Brew").first()).toBeVisible();
    await section.getByRole("tab", { name: /google wallet/i }).click();
    await expect(section.getByRole("tab", { name: /google wallet/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(section.getByText("Nakheel Rewards").first()).toBeVisible();
  });

  test("pricing toggle switches to yearly prices", async ({ page }) => {
    await page.goto("/");
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    const growth = page.locator("#pricing article").nth(1);
    await expect(growth).toContainText("$129");
    await page.getByRole("radio", { name: /yearly/i }).click();
    await expect(growth).toContainText("$103");
  });

  test("faq accordion expands and collapses", async ({ page }) => {
    await page.goto("/");
    const second = page.locator("#faq button[aria-expanded]").nth(1);
    await second.scrollIntoViewIfNeeded();
    await expect(second).toHaveAttribute("aria-expanded", "false");
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
  });

  test("staff terminal lets you add stamps and redeem", async ({ page }) => {
    await page.goto("/");
    const addStamp = page.getByRole("button", { name: /add 1 stamp/i });
    await addStamp.scrollIntoViewIfNeeded();
    const redeem = page.getByRole("button", { name: /redeem free drink/i });
    await expect(redeem).toBeDisabled();
    await addStamp.click();
    await addStamp.click();
    await expect(addStamp).toBeDisabled();
    await expect(redeem).toBeEnabled();
    await redeem.click();
    await expect(addStamp).toBeEnabled();
  });
});

test.describe("i18n", () => {
  test("arabic route is RTL with translated content", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("الطريقة الذكية");
  });

  test("locale switcher navigates between locales", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("radio", { name: "AR" }).locator("visible=true").first().click();
    await expect(page).toHaveURL(/\/ar$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});

test.describe("legal", () => {
  for (const slug of ["terms", "privacy", "refunds"]) {
    test(`/${slug} renders in both locales`, async ({ page }) => {
      await page.goto(`/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.goto(`/ar/${slug}`);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("unknown paths 404", async ({ request }) => {
    const res = await request.get("/definitely-not-a-page");
    expect(res.status()).toBe(404);
  });
});

test.describe("seo", () => {
  test("serves sitemap, robots and manifest", async ({ request }) => {
    for (const path of ["/sitemap.xml", "/robots.txt", "/manifest.webmanifest"]) {
      const res = await request.get(path);
      expect(res.ok(), path).toBeTruthy();
    }
  });

  test("has canonical + hreflang alternates", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
});

test.describe("pages", () => {
  for (const path of [
    "/solutions/cafes",
    "/solutions/restaurants",
    "/solutions/retail",
    "/solutions/enterprise",
    "/partners",
    "/contact",
    "/signup",
    "/login",
  ]) {
    test(`${path} renders with an H1 in both locales`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.goto(`/ar${path}`);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("footer solution links resolve to solution pages", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("footer")
      .getByRole("link", { name: /retail boutiques/i })
      .click();
    await expect(page).toHaveURL(/\/solutions\/retail$/);
  });
});

test.describe("seo extras", () => {
  test("home ships JSON-LD for Organization, SoftwareApplication and FAQPage", async ({ page }) => {
    await page.goto("/");
    const blobs = await page.locator('script[type="application/ld+json"]').allTextContents();
    const all = blobs.join(" ");
    expect(all).toContain('"Organization"');
    expect(all).toContain('"SoftwareApplication"');
    expect(all).toContain('"FAQPage"');
  });

  test("open graph images render for both locales", async ({ request }) => {
    for (const path of [
      "/opengraph-image",
      "/ar/opengraph-image",
      "/solutions/cafes/opengraph-image",
    ]) {
      const res = await request.get(path);
      expect(res.ok(), path).toBeTruthy();
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });

  test("sitemap lists solution and legal pages with hreflang", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/solutions/cafes");
    expect(xml).toContain("/ar/partners");
    expect(xml).toContain('hreflang="ar"');
  });
});
