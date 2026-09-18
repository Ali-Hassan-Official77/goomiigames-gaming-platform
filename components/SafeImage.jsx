"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, alt, fallback = "/logo.svg", ...props }) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      src={failed || !src ? fallback : src}
      alt={alt}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
