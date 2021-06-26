import { combineReducers } from '@reduxjs/toolkit';

import activitiesReducer from 'state/reducers/activities';

const rootReducer = combineReducers({
  activities: activitiesReducer,
});

export default rootReducer;
