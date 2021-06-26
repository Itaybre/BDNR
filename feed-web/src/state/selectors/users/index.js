import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state) => state.users;

export const selectAllUsers = createSelector(selectUsersState, (state) => ({
  ...state,
  allUsers: state.data,
}));

export const selectAllAdminUsers = createSelector(
  selectUsersState,
  (state) => ({
    ...state,
    adminUsers: state.data.filter(({ isAdmin }) => isAdmin),
  })
);

export const selectUserById = createSelector(
  selectUsersState,
  (_, userId) => userId,
  (state, userId) => ({
    ...state,
    user: state.data.find((user) => user.id === userId),
  })
);
