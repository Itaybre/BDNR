import {
  fetchUsersInit,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUserByIdInit,
  fetchUsersByIdSuccess,
  fetchUsersByIdFail,
} from 'state/actions/users';
import { generateNonAdminUser } from 'utils/mockData/users';

import usersReducer, { initialState } from '.';

describe('Users reducer', () => {
  const reducerTest = reducerTester(usersReducer);

  it('should return the initial state', () => {
    const currentState = initialState;

    const expectedState = initialState;

    reducerTest(currentState, {}, expectedState);
  });

  describe('Fetch users', () => {
    it('should set loading to true when fetchUsersInit action is fired', () => {
      const currentState = initialState;

      const expectedState = {
        ...initialState,
        loading: true,
      };

      reducerTest(currentState, fetchUsersInit(), expectedState);
    });

    it('should set loading to false, error to null and data with the corresponding payload when fetchUsersSuccess action is fired', () => {
      const users = [generateNonAdminUser()];

      const actionPayload = {
        users,
      };

      const currentState = initialState;

      const expectedState = {
        ...initialState,
        loading: false,
        error: null,
        data: users,
      };

      reducerTest(
        currentState,
        fetchUsersSuccess(actionPayload),
        expectedState
      );
    });

    it('should set loading to false and error to corresponding payload when fetchUsersFail action is fired', () => {
      const actionPayload = {
        error: 'Error message!',
      };

      const currentState = initialState;

      const expectedState = {
        ...initialState,
        loading: false,
        error: actionPayload.error,
      };

      reducerTest(currentState, fetchUsersFail(actionPayload), expectedState);
    });
  });

  describe('Fetch user by id', () => {
    it('should set loading to true when fetchUserById action is fired', () => {
      const currentState = initialState;

      const expectedState = {
        ...initialState,
        loading: true,
      };

      reducerTest(currentState, fetchUserByIdInit(), expectedState);
    });

    it('should set loading to false, error to null and data with the corresponding payload when fetchUserByIdSuccess action is fired', () => {
      const userToBeReturned = generateNonAdminUser();

      const actionPayload = {
        user: userToBeReturned,
      };

      const currentState = initialState;

      const expectedState = {
        ...initialState,
        loading: false,
        error: null,
        data: [userToBeReturned],
      };

      reducerTest(
        currentState,
        fetchUsersByIdSuccess(actionPayload),
        expectedState
      );
    });

    it('should set loading to false and error to corresponding payload when fetchUserByIdFail action is fired', () => {
      const actionPayload = {
        error: 'Error message!',
      };

      const currentState = initialState;

      const expectedState = {
        ...initialState,
        loading: false,
        error: actionPayload.error,
      };

      reducerTest(
        currentState,
        fetchUsersByIdFail(actionPayload),
        expectedState
      );
    });
  });
});
