import { Suspense } from "react";
import AddressData from "./addressData";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddressData />
    </Suspense>
  );
}
