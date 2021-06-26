/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import {
  fetchActivitiesByIdInit,
  fetchActivitiesByIdSuccess,
  fetchActivitiesByIdFail,
} from 'state/actions/activities';

export const initialState = {
  fetched: false,
  loading: false,
  data: [],
  error: null,
};

const activitiesReducer = createReducer(initialState, {
  [fetchActivitiesByIdInit]: (state) => {
    state.loading = true;
    state.fetched = false;
  },
  [fetchActivitiesByIdSuccess]: (state, action) => {
    const { activities } = action.payload;
    state.loading = false;
    state.fetched = true;
    state.error = null;
    state.data = activities;
  },
  [fetchActivitiesByIdFail]: (state, action) => {
    const { error } = action.payload;
    state.loading = false;
    state.fetched = true;
    state.error = error;
  },
});

export default activitiesReducer;
