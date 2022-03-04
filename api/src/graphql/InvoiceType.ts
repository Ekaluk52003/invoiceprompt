import { objectType, enumType, scalarType } from 'nexus';
import { UserType } from './UserType';
import { CustomertType } from './CustomerType';
import { GraphQLJSONObject } from 'graphql-type-json'


export const status = enumType({
  name: 'status',
  members: ['PAID', 'OVERDUE', 'CANCEL','DRAFT', 'BILLED'],
})

export const JSONScalar = scalarType({
  name: 'JSON',
  serialize: GraphQLJSONObject.serialize,
  parseValue: GraphQLJSONObject.parseValue,
  parseLiteral: GraphQLJSONObject.parseLiteral,
})



export const InvoiceType = objectType({
  name: 'InvoiceType',
  definition(t) {
    t.int('id');
    t.int('number');
    t.int('TotalAmount');
    t.int('term');
    t.int('userId');
    t.string('title');
    t.string('description');
    t.string('date');
    t.string('username');
    t.string('name');
    t.string('dueDate');
    t.string('createdAt');
    t.list.field('items', {
     //@ts-ignore
     type: JSONScalar,
      });

      t.field('customer', {
        type: CustomertType,
      });
    t.field('user', {
      type: UserType,
    });
    t.field('status', {
      type: status
    });
  },
});

export const InvoiceAmountType = objectType({
  name: 'InvoiceAmountType',
  definition(t) {
    t.int('amount');
    t.string('date');
  },
});

export const InvoiceHistoryType = objectType({
  name: 'InvoiceHistoryType',
  definition(t) {
    t.string('description');
    t.string('createdAt');
    t.string('user');
    t.int('invoiceId');
  },
});
