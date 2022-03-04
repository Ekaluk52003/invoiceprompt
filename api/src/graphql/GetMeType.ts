import { objectType } from 'nexus';

export const GetMeType = objectType({
  name: 'GetMeType',
  definition(t) {
    t.int('id');
    t.string('name')
     t.string('username')
     t.string('email')
  },
});
