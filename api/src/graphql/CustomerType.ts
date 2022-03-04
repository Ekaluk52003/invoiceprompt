import { objectType } from 'nexus';

export const CustomertType = objectType({
    name: 'CustomerType',
    definition(t) {
      t.string('name');
      t.string('contactInfo');
    },
  });
