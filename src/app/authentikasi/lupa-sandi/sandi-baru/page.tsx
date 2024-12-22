import dynamic from "next/dynamic";
import { Suspense } from "react";

const SandiBaru = dynamic(() => import("./sandiBaru"), { suspense: true });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SandiBaru />
    </Suspense>
  );
}
