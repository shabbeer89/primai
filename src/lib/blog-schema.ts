import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z.string()
    .min(1, "Content is required")
    .min(100, "Content must be at least 100 characters"),
  excerpt: z.string()
    .min(1, "Excerpt is required")
    .min(50, "Excerpt must be at least 50 characters")
    .max(300, "Excerpt must be less than 300 characters"),
  author: z.string()
    .min(1, "Author is required")
    .min(2, "Author name must be at least 2 characters"),
  tags: z.array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),
  categories: z.array(z.string())
    .min(1, "At least one category is required")
    .max(5, "Maximum 5 categories allowed"),
  published: z.boolean(),
  publishedAt: z.string().nullable().optional(),
  featuredImage: z.string().optional(),
  metaTitle: z.string().max(60, "Meta title must be less than 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description must be less than 160 characters").optional(),
  keywords: z.string().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
