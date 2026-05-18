import { redirect } from "next/navigation";

export const metadata = {
  title: "— Scripture Theory",
};

// The Heidelberg Catechism is a Reformed/Continental confessional document.
// Scripture Theory exists to elevate JESUS ALONE, not any single tradition —
// so this surface is muted until we revisit how (or whether) to present
// confessional catechisms in a way that does not skew the platform.
// The underlying data file (data/catechism.ts) is preserved on disk.
export default function CatechismPage() {
  redirect("/jesus");
}
