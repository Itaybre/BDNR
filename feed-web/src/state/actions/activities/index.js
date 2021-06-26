import { createAction } from '@reduxjs/toolkit';

import fetchActivitiesByFeedId from 'services/activities/fetchActivitiesByFeedId';

export const fetchActivitiesByIdInit = createAction(
  'ACTIVITIES_FETCH_ACTIVITIES_BY_FEED_ID_INIT'
);
export const fetchActivitiesByIdSuccess = createAction(
  'ACTIVITIES_FETCH_ACTIVITIES_BY_FEED_ID_SUCCESS'
);
export const fetchActivitiesByIdFail = createAction(
  'ACTIVITIES_FETCH_ACTIVITIES_BY_FEED_ID_FAIL'
);

export const fetchActivities = (feedId) => async (dispatch) => {
  dispatch(fetchActivitiesByIdInit());

  try {
    const activities = await fetchActivitiesByFeedId(feedId);

    return dispatch(fetchActivitiesByIdSuccess({ activities }));
  } catch (error) {
    return dispatch(fetchActivitiesByIdFail({ error: error.response.data }));
  }
};
