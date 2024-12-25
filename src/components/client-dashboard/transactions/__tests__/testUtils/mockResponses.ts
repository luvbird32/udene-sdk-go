import { TransactionResponse } from './types';
import { mockTransactionData } from './mockData';
import { createBaseResponse } from './responseBuilder';

export const createMockResponse = (): TransactionResponse => {
  return {
    ...createBaseResponse(),
    data: mockTransactionData,
  } as unknown as TransactionResponse;
};

export const createEmptyMockResponse = (): TransactionResponse => {
  return {
    ...createBaseResponse(),
    data: [],
  } as unknown as TransactionResponse;
};