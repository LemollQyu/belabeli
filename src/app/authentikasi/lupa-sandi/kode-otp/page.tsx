import { Suspense } from "react";
import OtpInput from "./otpInput";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpInput />
    </Suspense>
  );
}
