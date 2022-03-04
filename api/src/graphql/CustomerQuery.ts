import {extendType , stringArg} from 'nexus';
import { isAuthenticated } from '../utils';
import { CustomertType } from './CustomerType';
import { IMyContext } from '../interface';


export const CustomerQuery = extendType({
    type: 'Query',
  definition(t) {
    t.list.field('customers', {
        type: CustomertType,
        args: {
          name:stringArg(),

        },
        resolve: async (_, args, { prisma, session }: IMyContext) => {

            try {
                if (!isAuthenticated(session)) {
                  return null;
                }
                const keyword =  args.name ?  `%${args.name }%` : `%${''}%`;

                const customers = await prisma.$queryRaw`SELECT "name", "contactInfo" from "public"."Customer"
                WHERE "public"."Customer"."name"  ILIKE  ${keyword}
                `


                return customers
              } catch (err) {
                console.error(err)
              }
            }
        })

        t.field('customerSearch', {
          type: CustomertType,
          args: {
            customerName:stringArg(),
          },
          resolve: async (_, args, { prisma, session }: IMyContext) => {

              try {
                  if (!isAuthenticated(session)) {
                    return null;
                  }
                  const keyword =  args.customerName;

                  const customer:any = await prisma.$queryRaw`SELECT "name", "contactInfo" from "public"."Customer"
                  WHERE "public"."Customer"."name"  =  ${keyword}                  `
                  console.log(customer)

                  return customer[0]
                } catch (err) {
                  console.error(err)
                }
              }
          })
    }
})
