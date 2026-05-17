import { notFound } from "next/navigation";
import { readingPlans } from "@/data/readings";
import PlanCertificate from "@/components/PlanCertificate";

type Params = Promise<{ planId: string }>;

export function generateStaticParams() {
  return readingPlans.map((p) => ({ planId: p.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { planId } = await params;
  const plan = readingPlans.find((p) => p.id === planId);
  if (!plan) return { title: "Reading plan certificate — Scripture Theory" };
  return {
    title: `${plan.name} · certificate — Scripture Theory`,
    description: `A certificate of completion for the ${plan.name} reading plan.`,
  };
}

export default async function PlanCertPage({ params }: { params: Params }) {
  const { planId } = await params;
  const plan = readingPlans.find((p) => p.id === planId);
  if (!plan) notFound();
  return <PlanCertificate plan={plan} />;
}
