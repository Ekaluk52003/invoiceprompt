import {  inputObjectType } from 'nexus';
import { Roles } from './UserType';

export const ItemInput = inputObjectType({
    name: 'ItemInput',
    definition(t) {
      t.string('name')
      t.int('qty')
      t.int('price')
      t.int('amount')
    },
  })


export const registerUserInput = inputObjectType({
    name: 'registerUserInput',
    definition(t) {
      t.nonNull.string('name' )
      t.nonNull.string('email')
      t.nonNull.string('username')
      t.nonNull.string('password')
      t.list.field('role',  {
        type: Roles,
        default:"USER"
      });
    },
  })

