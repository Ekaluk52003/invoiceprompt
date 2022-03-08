import {User } from '.prisma/client';
import { intArg, mutationType, stringArg, arg, list} from 'nexus';
import {
  ALREADY_TAKEN,
  INVALID_CREDENTIALS,
  NOT_AUTHENTICATED,
} from '../constants';
import { IMyContext } from '../interface';
import { hashPassword, isAuthenticated, verifyPassword } from '../utils';
import {  UserType } from './UserType';
import { registerUserInput, ItemInput } from './InputFields';
import { InvoiceNumber, InvoiceType,status } from './InvoiceType';




export const Mutation = mutationType({
  definition(t) {

      t.boolean('logoutUser', {
        resolve: (_, __, { session , res }: IMyContext) => {
          session.destroy((err) => {
            if (err) {
              console.log(`Error destroying session => `);
              console.error(err);
            }
          });
          res.clearCookie("gql-api");
          return true;
        },
      });
    t.boolean('loginUser', {
      args: {
        username: stringArg(),
        password: stringArg(),
      },
      resolve: async (
        _,
        { ...userDetails }: Pick<User, 'username' | 'password'>,
        { prisma, session }: IMyContext,
      ) => {
        try {

          const user = await prisma.user.findUnique({
            where: {
              username: userDetails.username,
            },
          });

          if (!user) {
            return new Error(INVALID_CREDENTIALS);
          }

          const isCorrect = await verifyPassword(
            userDetails.password,
            user.password,
          );

          if (!isCorrect) {
            return new Error(INVALID_CREDENTIALS);
          }

          session['userId'] = user.id;

          return true;
        } catch (err) {
          const errorCaught = err as any;
          return new Error(errorCaught.message);
        }
      },
    });

    t.nonNull.field('createInvoice', {
      type :InvoiceType,
      args: {
        title: stringArg(),
        description: stringArg(),
        term:intArg(),
        dueDate:stringArg(),
        TotalAmount: intArg(),
        customer:stringArg(),
        status:status,
        contactInfo:stringArg(),
        items: list(ItemInput)
      },


      resolve: async (
        _,
        args,
        { prisma, session }: IMyContext,
      ) => {
        console.log('ARG', args)
        try {
          if (!isAuthenticated(session)) {
            return new Error(NOT_AUTHENTICATED);
          }
            const invoiceNumber = await prisma.invoiceNumber.update({
              where: {
                id:1
              },
              data: {
               number: {
                increment: 1,
               }
              },
            })

          const invoice = await prisma.invoice.create({
           data:{
            TotalAmount:args.TotalAmount,
             title:args.title,
             customer:{
               connectOrCreate:{
                 where:{
                  name:args.customer
                 },
                 create: {

                  name:args.customer,
                  contactInfo:args.contactInfo
                },
               }
             },
             term:args.term,
             status:args.status || 'DRAFT',
             description :args.description,
             dueDate:new Date(args.dueDate),
             user:{
               connect:{
                 id:session.userId
               }
             },
            items: args.items,
            number:invoiceNumber.number
           }
          });

          return invoice;
        } catch (err) {
            console.log(err)
          const errorCaught = err as any;
          if (errorCaught.code === 'P2002') {
            const errorMessage = `${errorCaught.meta.target.toString()} ${ALREADY_TAKEN}`;
            return new Error(errorMessage);
          } else {
            return new Error(errorCaught.message);
          }
        }
      },
    }),

    t.nonNull.field('updateInvoice', {
      type :InvoiceType,
      args: {
        title: stringArg(),
        TotalAmount: intArg(),
        items: list(ItemInput),
        id:intArg(),
        description: stringArg(),
        term:intArg(),
        dueDate:stringArg(),
        status:status,
        customer:stringArg(),
        contactInfo:stringArg(),
      },


      resolve: async (
        _,
        args,
        { prisma, session }: IMyContext,
      ) => {
        try {
          if (!isAuthenticated(session)) {
            return new Error(NOT_AUTHENTICATED);          }

          const me = await prisma.user.findUnique({
            where:{
              id:session.userId,
            }
          })

          console.log(args.status )
          if(args.status ) {

           await prisma.invoice.update({
              where: {
                id:args.id
              },

              data: {
              title:args.title,
              TotalAmount:args.TotalAmount,
              items:args.items,
              term:args.term,
              dueDate:new Date(args.dueDate),
              status:args.status,
              description:args.description,
              InvoiceHistory: {
                create:{
                  user:me?.name,
                  description:`you udate status of invice to ${args.status}`
                }
              },

              customer:{
                connectOrCreate:{
                  where:{
                    name:args.customer
                  },
                  create:{
                    name:args.customer,
                    contactInfo:args.contactInfo
                  }

                }
              }
              },
              include :{
                customer:true,
                user:true
              }
            })



          }

          const invoice = await prisma.invoice.update({
            where: {
              id:args.id
            },

            data: {
            title:args.title,
            TotalAmount:args.TotalAmount,
            items:args.items,
            term:args.term,
            dueDate:new Date(args.dueDate),
            status:args.status,
            description:args.description,

            customer:{
              connectOrCreate:{
                where:{
                  name:args.customer
                },
                create:{
                  name:args.customer,
                  contactInfo:args.contactInfo
                }

              }
            }
            },
            include :{
              customer:true,
              user:true
            }
          })



          return invoice

        } catch (err) {
          console.log(err)
          const errorCaught = err as any;
          if (errorCaught.code === 'P2002') {
            const errorMessage = `${errorCaught.meta.target.toString()} ${ALREADY_TAKEN}`;
            return new Error(errorMessage);
          } else {
            return new Error(errorCaught.message);
          }
        }
      },
    }),


    t.nonNull.field('registerUser', {

      type:UserType,
      args:{

        input:arg({type: registerUserInput}),

      },

      resolve: async (
        _,
        args,
        { prisma }: IMyContext,
      ) => {
        try {
          // if (!isAuthenticated(session)) {
          //   return new Error(NOT_AUTHORIZED);
          // }
          const hashedPassword = await hashPassword(args.input.password);
          console.log()
        const user =  await prisma.user.create({
            data: {
              ...args.input,
              password: hashedPassword,
            }
          });
          return user
        } catch (err) {

          const errorCaught = err as any;
          console.log('errorCaught:' ,errorCaught)
          if (errorCaught.code === 'P2002') {
            const errorMessage = `${errorCaught.meta.target.toString()} ${ALREADY_TAKEN}`;
            return new Error(errorMessage);
          }
          else {
            return new Error(errorCaught);
          }
        }
      },
    });

    t.nonNull.field('invoicenumber', {
      type:InvoiceNumber,
      args:{
        number:intArg()

      },

      resolve: async (
        _,
        args,
        { prisma }: IMyContext,
      ) => {
  const invoiceNum = await prisma.invoiceNumber.create({
    data:args.number
  })
  return  invoiceNum
        },
    });
  },


});
