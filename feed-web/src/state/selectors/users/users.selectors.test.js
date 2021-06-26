import { initialState } from 'state/reducers/users';

import { generateNonAdminUser, generateAdminUser } from 'utils/mockData/users';

import { selectAllAdminUsers, selectUserById, selectAllUsers } from '.';

describe('Users selectors', () => {
  describe('selectAllAdminUsers()', () => {
    it('should return no admin users if there are no admin users', () => {
      const nonAdminUser = generateNonAdminUser();

      const noAdminUsersState = {
        users: {
          ...initialState,
          data: [nonAdminUser],
        },
      };

      const selectorResult = selectAllAdminUsers(noAdminUsersState);

      const expected = [];

      expect(selectorResult.adminUsers).toEqual(expected);
    });

    it('should return only one admin user if there is one admin users', () => {
      const adminUser = generateAdminUser();
      const nonAdminUser = generateNonAdminUser();

      const oneAdminUserState = {
        users: {
          ...initialState,
          data: [adminUser, nonAdminUser],
        },
      };

      const selectorResult = selectAllAdminUsers(oneAdminUserState);

      const expected = [adminUser];

      expect(selectorResult.adminUsers).toEqual(expected);
    });

    it('should return two admin users if there is two admin users', () => {
      const adminUserOne = generateAdminUser();
      const adminUserTwo = generateAdminUser();
      const nonAdminUser = generateNonAdminUser();

      const twoAdminUserState = {
        users: {
          ...initialState,
          data: [nonAdminUser, adminUserOne, adminUserTwo],
        },
      };

      const selectorResult = selectAllAdminUsers(twoAdminUserState);

      const expected = [adminUserOne, adminUserTwo];

      expect(selectorResult.adminUsers).toEqual(expected);
    });

    it('should return all admin users if there is more than two admin users', () => {
      const adminUserOne = generateAdminUser();
      const adminUserTwo = generateAdminUser();
      const adminUserThree = generateAdminUser();
      const nonAdminUser = generateNonAdminUser();

      const moreThanTwoAdminUserState = {
        users: {
          ...initialState,
          data: [nonAdminUser, adminUserOne, adminUserTwo, adminUserThree],
        },
      };

      const selectorResult = selectAllAdminUsers(moreThanTwoAdminUserState);

      const expected = [adminUserOne, adminUserTwo, adminUserThree];

      expect(selectorResult.adminUsers).toEqual(expected);
    });
  });

  describe('selectUserById()', () => {
    it('should return the correct user if there is a user with that id', () => {
      const nonAdminUser = generateNonAdminUser();

      const state = {
        users: {
          ...initialState,
          data: [nonAdminUser],
        },
      };

      const selectorResult = selectUserById(state, nonAdminUser.id);

      const expected = nonAdminUser;

      expect(selectorResult.user).toEqual(expected);
    });

    it('should return null if there is no user with that id', () => {
      const nonAdminUser = generateNonAdminUser();

      const state = {
        users: {
          ...initialState,
          data: [nonAdminUser],
        },
      };

      const selectorResult = selectUserById(state, 'randomId');

      expect(selectorResult.user).toBeUndefined();
    });
  });

  describe('selectAllUsers()', () => {
    it('should return all users correctly', () => {
      const nonAdminUser = generateNonAdminUser();

      const state = {
        users: {
          ...initialState,
          data: [nonAdminUser],
        },
      };

      const selectorResult = selectAllUsers(state);

      expect(selectorResult.allUsers).toEqual(state.users.data);
    });
  });
});
