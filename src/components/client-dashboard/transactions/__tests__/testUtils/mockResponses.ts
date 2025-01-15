import { TransactionResponse } from './types';
import { mockTransactions } from './mockData';
import { createBaseResponse } from './responseBuilder';

export const createMockResponse = (): TransactionResponse => {
  return {
    ...createBaseResponse(),
    data: mockTransactions,
  } as unknown as TransactionResponse;
};

export const createEmptyMockResponse = (): TransactionResponse => {
  return {
    ...createBaseResponse(),
    data: [],
  } as unknown as TransactionResponse;
};