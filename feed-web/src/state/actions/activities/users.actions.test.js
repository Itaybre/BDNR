import * as fetchUsersService from 'services/users/fetchUsers';
import * as fetchUserByIdService from 'services/users/fetchUserById';

import { generateAdminUser, generateNonAdminUser } from 'utils/mockData/users';

import {
  fetchUsersInit,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUsers,
  fetchUserByIdInit,
  fetchUsersByIdSuccess,
  fetchUsersByIdFail,
  fetchUserById,
} from '.';

describe('Users actions', () => {
  describe('fetchUsers()', () => {
    const fetchUsersMock = jest.spyOn(fetchUsersService, 'default');

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should dispatch the fetchUsersInit action and the fetchUserSuccess action with the corresponding users when the fetch users api call succeeds', async () => {
      const users = [generateAdminUser(), generateNonAdminUser()];

      fetchUsersMock.mockImplementationOnce(() => users);

      const initialState = {};

      const expectedActions = [fetchUsersInit(), fetchUsersSuccess({ users })];

      await actionTester(initialState, fetchUsers(), expectedActions);
    });

    it('should dispatch the fetchUsersInit action and the fetchUserFail action with the corresponding error when the fetch users api call fails', async () => {
      const errorMessage = 'Error!';

      fetchUsersMock.mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      const initialState = {};

      const expectedActions = [
        fetchUsersInit(),
        fetchUsersFail({ error: errorMessage }),
      ];

      await actionTester(initialState, fetchUsers(), expectedActions);
    });
  });

  describe('fetchUserById()', () => {
    const fetchUserByIdMock = jest.spyOn(fetchUserByIdService, 'default');

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should dispatch the fetchUserByIdInit action and the fetchUserByIdSuccess action with the corresponding user when the fetch user by id api call succeeds', async () => {
      const userToBeReturned = generateNonAdminUser();

      fetchUserByIdMock.mockImplementationOnce(() => userToBeReturned);

      const initialState = {};

      const expectedActions = [
        fetchUserByIdInit(),
        fetchUsersByIdSuccess({ user: userToBeReturned }),
      ];

      await actionTester(
        initialState,
        fetchUserById(userToBeReturned.id),
        expectedActions
      );
    });

    it('should dispatch the fetchUserByIdInit action and the fetchUserByIdFail action with the corresponding error when the fetch user by id api call fails', async () => {
      const errorMessage = 'Error!';

      fetchUserByIdMock.mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      const initialState = {};

      const expectedActions = [
        fetchUserByIdInit(),
        fetchUsersByIdFail({ error: errorMessage }),
      ];

      await actionTester(initialState, fetchUserById('id'), expectedActions);
    });
  });
});
