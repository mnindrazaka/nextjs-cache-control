import React from "react";
import Link from "next/link";

export function HomeScreen() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link href="/products-ssg">Products SSG</Link>
      <br />
      <Link href="/products-ssr">Products SSR</Link>
    </div>
  );
}

export default HomeScreen;
