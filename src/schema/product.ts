import { z } from 'zod';

export const productSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  price: z.number(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Product = z.infer<typeof productSchema>;
