import { queryType, stringArg, intArg, booleanArg } from 'nexus';
import { INTERNAL_SERVER_ERROR, NOT_AUTHENTICATED } from '../constants';

import { IMyContext } from '../interface';
import { isAuthenticated} from '../utils';
import { GetMeType } from './GetMeType';
import { InvoiceType,  InvoiceAmountType, status, InvoiceHistoryType } from './InvoiceType';

export const Query = queryType({
  definition(t) {

    t.field('getMe', {
      type: GetMeType,
      //@ts-ignore
      // authorize: (_, __, { session }: IMyContext ) => isAuthenticated(session),
      resolve: async (_, __, { prisma, session }: IMyContext) => {

        if (!session.userId) {
          return null;
        }

        const me = await prisma.user.findUnique({
          where:{
            id:session.userId,
          }
        })

        return me
      },
    });



    t.list.field('invoices', {
      type: InvoiceType,
      resolve: async (_, __, { prisma, session }: IMyContext) => {

        try {
          if (!isAuthenticated(session)) {
            return null;
          }
          const invoices = await prisma.invoice.findMany({
            include: {
             user:true
             },

          });
          return invoices
        } catch (err) {
          console.error(err);
          return new Error(INTERNAL_SERVER_ERROR);
        }
      }}
      );

      t.list.field('suminvoices', {
        type:  InvoiceAmountType,
        args: {
          Limit:intArg()
        },
        resolve: async (_, args, { prisma, session }: IMyContext) => {

          try {
            if (!isAuthenticated(session)) {
              return null;
            }
            const Limit = args.Limit || 7
            const sumInv = await prisma.$queryRaw`SELECT to_char("createdAt":: DATE, 'dd-Mon-yy') as date, sum("TotalAmount") as amount from "public"."Invoice" GROUP BY "createdAt":: DATE  ORDER BY "createdAt"::date DESC LIMIT ${Limit}`

            return sumInv
          } catch (err) {
            console.error(err);
            return new Error(INTERNAL_SERVER_ERROR);
          }
        }}
        );

      t.field('findInvoiceById', {
        type: InvoiceType,
        args: {
          id:intArg()
        },

        resolve: async (_, args, { prisma, session }: IMyContext) => {

          try {
            if (!isAuthenticated(session)) {
              return new Error(NOT_AUTHENTICATED);
            }

            const invoice = await prisma.invoice.findUnique({
              where: {
                 id:args.id
              },

              include: {
               user:true,
               customer:true
               },


            });
            return invoice
          } catch (err) {
            console.error(err);
            return new Error(INTERNAL_SERVER_ERROR);
          }
        }}
        );


      t.list.field('findinvoice', {
      type: InvoiceType,
      args: {
        where:stringArg(),
        fromDate:stringArg(),
        toDate:stringArg(),
        overdue:booleanArg(),
        status:status
      },
      resolve: async (_, args, { prisma, session }: IMyContext) => {

        try {
          if (!isAuthenticated(session)) {
            return null
          }



          const keyword =  args.where ?  `%${args.where}%` : `%${''}%`;
          const fromDate = new Date(args.fromDate) ;
          const toDate =  new Date(args.toDate)
          const status = args.status


          if (args.overdue) {
            const invoices = await prisma.$queryRaw`SELECT "public"."Invoice"."id", "public"."Invoice"."createdAt", "Invoice"."dueDate", "number", "TotalAmount" , "public"."Invoice"."status", "public"."Customer"."name", "title", "username" from "public"."Invoice"  INNER JOIN "public"."User" ON "public"."Invoice"."userId" = "public"."User"."id"
            INNER JOIN "public"."Customer" ON "public"."Invoice"."customerId" = "public"."Customer"."id"
            WHERE  "public"."Invoice"."dueDate"::date <= now()::date AND "title" ILIKE  ${keyword} AND "Invoice"."status" = ${status} ORDER BY "createdAt" DESC`
            console.log('no date ARG')
            return invoices
          } else {

            const invoices = await prisma.$queryRaw`SELECT "public"."Invoice"."id", "public"."Invoice"."createdAt", "Invoice"."dueDate", "number", "TotalAmount" , "public"."Invoice"."status", "public"."Customer"."name", "title", "username" from "public"."Invoice"  INNER JOIN "public"."User" ON "public"."Invoice"."userId" = "public"."User"."id"
            INNER JOIN "public"."Customer" ON "public"."Invoice"."customerId" = "public"."Customer"."id"
            WHERE  "public"."Invoice"."createdAt" >= ${fromDate} AND "public"."Invoice"."createdAt" <=  ${toDate} AND "title" ILIKE  ${keyword} AND "Invoice"."status" = ${status} ORDER BY "createdAt" DESC`
            console.log('date ARG')
            return invoices
          }

        } catch (err) {
          console.error(err);
          return new Error(INTERNAL_SERVER_ERROR);
        }
      }}
      );


      t.list.field('findinvoiceHistory', {
        type: InvoiceHistoryType,
        args: {
          invoiceId:intArg()
        },
        resolve: async (_, args, { prisma, session }: IMyContext) => {

          try {
            if (!isAuthenticated(session)) {
              return null
            }

            const invoiceHistory = await prisma.invoiceHistory.findMany({
              where:{
                invoiceId:args.invoiceId
              },
              orderBy:{
                createdAt:"desc"
              }
            })



            return invoiceHistory
          } catch (err) {
            console.error(err);
            return new Error(INTERNAL_SERVER_ERROR);
          }
        }}
        );


      t.field('SumRange', {
        type:  InvoiceAmountType,
        args: {
          fromDate:stringArg(),
          toDate:stringArg()
        },

        resolve: async (_, args, { prisma, session }: IMyContext):Promise<any> => {

          try {
            if (!isAuthenticated(session)) {
              return null
            }
            const fromDate = new Date(args.fromDate) ;
            const toDate =  new Date(args.toDate);
            const Sum:any = await prisma.$queryRaw`SELECT sum("public"."Invoice"."TotalAmount") AS amount FROM "public"."Invoice"  WHERE  "public"."Invoice"."createdAt" BETWEEN ${fromDate} AND ${toDate}`

            return Sum[0]
          } catch (err) {
            console.error(err);
            return new Error(INTERNAL_SERVER_ERROR);
          }
        }}
        );

    t.list.field('invoices', {
      type: InvoiceType,
      resolve: async (_, __, { prisma, session }: IMyContext) => {

        try {
          if (!isAuthenticated(session)) {
            return new Error(NOT_AUTHENTICATED);
          }
          const invoices = await prisma.invoice.findMany({
            include: {
             user:true,
             customer:true
             },

          });
          return  invoices;

        } catch (err) {
          console.error(err);
          return new Error(INTERNAL_SERVER_ERROR);
        }
      },
    });
  },


});
