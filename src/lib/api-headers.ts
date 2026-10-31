/** Browser POSTs to public JSON APIs must send this so non-browser clients are rejected. */
export const publicJsonHeaders = {
  "Content-Type": "application/json",
  "X-Requested-With": "Filing360",
} as const;

export const REQUESTED_WITH = "Filing360";
