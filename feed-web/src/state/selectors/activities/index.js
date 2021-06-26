import { createSelector } from '@reduxjs/toolkit';

export const selectActivitiesState = (state) => state.activities;

export const selectAllActivities = createSelector(
  selectActivitiesState,
  (state) => ({
    ...state,
    activities: state.data,
  })
);
