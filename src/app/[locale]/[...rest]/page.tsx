import { notFound } from "next/navigation";

/** Catch-all so unknown paths under a valid locale render the localised 404. */
export default function CatchAllPage() {
  notFound();
}
