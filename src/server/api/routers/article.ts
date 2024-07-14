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
        description: z.string().max(1000),
        status: z.enum(["ARCHIVE", "PUBLISHED", "UNPUBLISHED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const { title, description, content, status } = input;
      const slugName = title.replace(":", " ").replace("+", " ");

      return ctx.db.article.create({
        data: {
          title,
          slug_name: slugify(slugName),
          description,
          content,
          status,
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
  getMetaDataForSeo: publicProcedure
    .input(
      z.object({
        slug_name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.article.findFirst({
        select: { title: true, description: true },
        orderBy: { createdAt: "desc" },
        where: { slug_name: input.slug_name },
      });
    }),

  getAllCount: protectedProcedure
    .input(
      z.object({
        status: z
          .enum(["ARCHIVE", "PUBLISHED", "UNPUBLISHED", "ALL"])
          .default("ALL"),
      }),
    )
    .query(({ ctx, input }) => {
      if (input.status === "ALL") {
        return ctx.db.article.count({
          where: {
            createdBy: { id: ctx.session.user.id },
          },
        });
      } else {
        return ctx.db.article.count({
          where: {
            createdBy: { id: ctx.session.user.id },
            status: input.status,
          },
        });
      }
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        status: z
          .enum(["ARCHIVE", "PUBLISHED", "UNPUBLISHED", "ALL"])
          .default("ALL"),
      }),
    )
    .query(async ({ ctx, input }) => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      if (input.status === "ALL") {
        return ctx.db.article.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            createdBy: { id: ctx.session.user.id },
          },
          take: 10,
          skip: input.page * 10,
        });
      } else {
        return ctx.db.article.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            createdBy: { id: ctx.session.user.id },
            status: input.status,
          },
          take: 10,
          skip: input.page * 10,
        });
      }
    }),

  getAllPublished: publicProcedure
    .input(z.object({ page: z.number(), limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      return ctx.db.article.findMany({
        orderBy: { createdAt: "desc" },
        where: { status: "PUBLISHED" },
        take: input.limit,
        skip: input.page * input.limit,
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
