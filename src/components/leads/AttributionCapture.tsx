"use client";

import { useEffect } from "react";
import { recordAttribution } from "@/lib/leads/attribution-client";

export function AttributionCapture() {
  useEffect(() => {
    recordAttribution();
  }, []);
  return null;
}
