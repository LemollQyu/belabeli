import { Suspense } from "react";
import CallbackGoogle from "./callbackGoogle";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackGoogle />
    </Suspense>
  );
}
