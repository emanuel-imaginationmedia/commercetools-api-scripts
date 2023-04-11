import {
  ClientResponse, Payment, TransactionState, TransactionType,
} from '@commercetools/platform-sdk';
import { rootApiClient } from '../../auth/root-api-client';

export const createPayment = (data: {
  interfaceId: string;
  amountPlanned: number;
  paymentMethodInfo: {
    paymentInterface: string;
    method: string;
    name: string;
  };
  transactions: Array<{
    timestamp: string;
    type: TransactionType;
    amount: number;
    state: TransactionState;
  }>;
}): Promise<ClientResponse<Payment>> => rootApiClient
  .payments()
  .post({
    body: {
      interfaceId: data.interfaceId,
      amountPlanned: {
        currencyCode: 'USD',
        centAmount: data.amountPlanned,
      },
      paymentMethodInfo: {
        paymentInterface: data.paymentMethodInfo.paymentInterface,
        method: data.paymentMethodInfo.method,
        name: {
          en: data.paymentMethodInfo.name,
        },
      },
      transactions: data.transactions.map((transaction) => ({
        timestamp: transaction.timestamp,
        type: transaction.type,
        amount: {
          currencyCode: 'USD',
          centAmount: transaction.amount,
        },
        state: transaction.state,
      })),
    },
  })
  .execute();
