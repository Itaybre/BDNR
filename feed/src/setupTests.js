/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import deepFreeze from 'deep-freeze';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const middlewares = [thunk];

global.reducerTester = (reducer) => (currentState, action, expectedState) => {
  if (currentState && typeof currentState === 'object') {
    deepFreeze(currentState);
  }
  const newState = reducer(currentState, action);

  return expect(newState).toEqual(expectedState);
};

const mockedStore = (initial = {}) => configureStore(middlewares)(initial);

global.actionTester = async (initialState, action, expectedActions) => {
  const store = mockedStore(initialState);

  await store.dispatch(action);

  expect(store.getActions()).toEqual(expectedActions);
};

// Use this to test mounted components w/ store connection
global.renderWithProviders = (children) => (initialState) => {
  const store = mockedStore(initialState);
  return render(
    <BrowserRouter keyLength={0}>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};
