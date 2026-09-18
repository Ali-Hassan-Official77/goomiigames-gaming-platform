import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return <div className="content-shell loading-page"><LoadingSkeleton count={12} /></div>;
}
