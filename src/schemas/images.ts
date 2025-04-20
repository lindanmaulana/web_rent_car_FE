import { z, ZodType } from "zod";

const imageSchema: ZodType = z.instanceof(File).refine(file => !!file, "File harus di isi")
.refine((file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type), "Hanya file JPEG, JPG, atau PNG yang di perbolehkan")
.refine((file) => file.size <= 2 * 1024 * 1024, "Ukuran file maksimal 2MB")

export const ImageAddSchema: ZodType = z.object({
    image: imageSchema
})

export type TypeImageAddSchema = z.infer<typeof ImageAddSchema>