"use client";
import { usePathname } from "next/navigation";

const Profile = () => {
  const pathname = usePathname();

  console.log(pathname);

  return <></>;
};

export default Profile;
