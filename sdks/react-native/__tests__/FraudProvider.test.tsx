
import React from 'react';
import { render } from '@testing-library/react-native';
import { FraudProvider } from '../src/components/FraudProvider';

describe('FraudProvider', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <FraudProvider apiKey="test-api-key" testID="fraud-provider">
        <></>
      </FraudProvider>
    );
    
    expect(getByTestId('fraud-provider')).toBeDefined();
  });
});
