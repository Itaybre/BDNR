import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Router from '.';

describe('<Router />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render without crashing', () => {
    const { asFragment } = render(<Router />);

    expect(asFragment()).toMatchSnapshot();
  });
});
