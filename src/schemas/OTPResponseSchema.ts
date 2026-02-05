import type { InferOutput } from 'valibot';

import { intersect, string, object, record } from 'valibot';

export const OTPResponseSchema = intersect([
  object({
    createdAtTimestampLackingMsPrecision: string(),
    expiresAt: string(),
    otpCode: string(),
    secret: string()
  }),
  record(string(), string())
]);

export type OTPResponse = InferOutput<typeof OTPResponseSchema>;
