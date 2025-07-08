import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-100 border-b-gray-500 border">
      <Navbar />
    </header>
  );
}
