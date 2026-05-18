import { redirect } from "next/navigation";

export const metadata = {
  title: "Jesus in the Word — Scripture Theory",
  description:
    "This section has been merged into Jesus throughout the Scriptures — a comprehensive Christ-centered reading of the whole Bible with the witnesses of the Fathers, Reformers, and modern theologians.",
};

export default function LensPage() {
  // "Jesus in the Word" was merged into the canonical "Jesus throughout
  // the Scriptures" page. The six-tradition multi-voice readings now
  // live under Part Two of /jesus.
  redirect("/jesus#emphases");
}
