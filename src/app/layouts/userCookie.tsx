"use client";

import { useContext } from "react";
// import LogOut from "../components/logout";
import { AppContext } from "../actionPage";

type UserCookies = {
  access_token: string;
};

const UserCookie = ({ children }: any) => {
  // const cookieStore = await getToken();
  // const getAccountFromCookies = await getAccount();
  // // console.log(cookieStore);
  // console.log(getAccountFromCookies);

  const context = useContext(AppContext);

  // Periksa apakah context tidak null sebelum mendestructurnya
  if (!context) {
    return <div>Loading...</div>; // atau bisa juga menampilkan sesuatu yang lain
  }

  const { access_token }: UserCookies = context;

  return (
    <>
      {/* <LogOut token={access_token} /> */}
      {children}
    </>
  );
};

export default UserCookie;
