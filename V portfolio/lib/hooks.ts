"use client";
import { useEffect, useState } from "react";
export function useMedia(query: string, initial = false) {
  const [m, setM] = useState(initial);
  useEffect(() => {
    const q = matchMedia(query);
    const on = () => setM(q.matches);
    on(); q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, [query]);
  return m;
}
