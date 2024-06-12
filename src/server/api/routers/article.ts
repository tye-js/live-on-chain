import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import slugify from "slugify";

export const articleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string(),
        status: z
          .enum(["ARCHIVE", "PUBLISHED", "UNPUBLISHED"])
          .default("ARCHIVE"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return ctx.db.article.create({
        data: {
          title: input.title,
          slug_name: slugify(input.title),
          content: input.content,
          status: input.status,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getOne: publicProcedure
    .input(
      z.object({
        slug_name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.article.findFirst({
        orderBy: { createdAt: "desc" },
        where: { slug_name: input.slug_name },
        include: { createdBy: true },
      });
    }),
  getAll: protectedProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.article.findMany({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
        take: 10,
        skip: input.page * 10,
      });
    }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.article.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
