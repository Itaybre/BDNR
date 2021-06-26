import React from 'react';
import { cleanup } from '@testing-library/react';

import PrivateRoute from '.';

describe('<PrivateRoute />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render without crashing', () => {
    const { asFragment } = renderWithProviders(
      <PrivateRoute component={() => <h1>Hello</h1>} />
    )();

    expect(asFragment()).toMatchSnapshot();
  });
});
