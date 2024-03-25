import { z } from 'zod';

export const schema = z.object({
  cardName: z.string()
    .min(1, 'Nome obrigatorio')
    .max(22, 'Nome deve ter no maximo 22 caracteres'),
  cardNumber: z.string()
    .length(19, 'Número deve ter 16 caracteres'),
  cardExp: z.string()
    .length(5, 'Expiração deve ter 4 caracteres'),
  cardCvv: z.string()
    .length(3, 'Expiração deve ter 3 caracteres')
});

export type CreateFormTypes = z.infer<typeof schema>
