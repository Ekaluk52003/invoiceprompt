import { objectType, enumType } from 'nexus';


export const Roles = enumType({
  name: 'Roles',
  members: ['USER', 'ADMIN'],
})

export const UserType = objectType({
  name: 'UserType',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('username');
    t.string('email');
    // t.string('password');
    t.float('createdAt');
    t.list.field('role', {
      type: Roles
    });

  },
});
