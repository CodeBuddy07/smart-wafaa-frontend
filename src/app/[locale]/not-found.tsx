import { useTranslations } from "next-intl";

import { Button, Container } from "@/components/ui";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container className="flex min-h-[70dvh] flex-col items-center justify-center py-32 text-center">
      <p className="font-sans text-sm font-semibold tracking-[0.18em] text-brand-800 uppercase">
        404
      </p>
      <h1 className="mt-4 text-display-md font-extrabold">{t("title")}</h1>
      <p className="mt-4 max-w-md text-lead text-ink-600">{t("description")}</p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">{t("back")}</Link>
      </Button>
    </Container>
  );
}
