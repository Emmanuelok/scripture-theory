import AccountPanel from "@/components/AccountPanel";
import PersonalSubNav from "@/components/PersonalSubNav";

export const metadata = {
  title: "Account — Scripture Theory",
  description:
    "Optional sign-in for cross-device sync. Never required. The Secret Place stays on your device.",
};

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Account</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Optional, never required.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Signing in is for one thing: not losing your progress if you change devices. Your reading
        plans, prayer list, fasts, examens, and the people you carry can travel with you. The Secret
        Place stays on your device unless you explicitly opt it in.
      </p>
      <div className="mt-10">
        <PersonalSubNav />
        <AccountPanel />
      </div>
    </section>
  );
}
