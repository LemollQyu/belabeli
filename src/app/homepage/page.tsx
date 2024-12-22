import { Suspense } from "react";

import Homepage from "./homepage";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Homepage />
    </Suspense>
  );
}
