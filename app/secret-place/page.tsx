import SecretPlace from "@/components/SecretPlace";
import PersonalSubNav from "@/components/PersonalSubNav";

export const metadata = {
  title: "My Secret Place — Scripture Theory",
  description:
    "A private, contemplative space rooted in Matthew 6:6. Reflect, pray, journal, give thanks — your walk with Jesus, captured on your device, never shared.",
};

export default function SecretPlacePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PersonalSubNav />
      <SecretPlace />
    </section>
  );
}
