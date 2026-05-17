import CohortView from "@/components/CohortView";

type Params = Promise<{ code: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { code } = await params;
  return {
    title: `${code.toUpperCase()} · cohort — Scripture Theory`,
    description: "Your Foundations cohort — members, weekly progress, shared prayer thread.",
  };
}

export default async function CohortDetailPage({ params }: { params: Params }) {
  const { code } = await params;
  return <CohortView code={code} />;
}
