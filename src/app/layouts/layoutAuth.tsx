"use client";
import React, { ReactNode } from "react";

interface LayoutUtamaProps {
  children: ReactNode;
}

const LayoutUtama: React.FC<LayoutUtamaProps> = ({ children }) => {
  return <div className=" mx-auto w-[360px] border-2">{children}</div>;
};

export default LayoutUtama;
