// tests/fixtures/receipts.ts
import { Receipt } from '../../src/types/receipt';

export const validReceipt: Receipt = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: [
    {
      shortDescription: 'Mountain Dew 12PK',
      price: '6.49'
    },
    {
      shortDescription: 'Emils Cheese Pizza',
      price: '12.25'
    }
  ],
  total: '18.74'
};

export const roundDollarReceipt: Receipt = {
  retailer: 'M&M Corner Market',
  purchaseDate: '2022-03-20',
  purchaseTime: '14:33',
  items: [
    {
      shortDescription: 'Gatorade',
      price: '2.25'
    },
    {
      shortDescription: 'Gatorade',
      price: '2.25'
    }
  ],
  total: '9.00'
};

export const multipleItemsReceipt: Receipt = {
  retailer: 'Walmart',
  purchaseDate: '2022-01-02',
  purchaseTime: '15:01',
  items: [
    {
      shortDescription: 'Item 1',
      price: '1.00'
    },
    {
      shortDescription: 'Item 2',
      price: '2.00'
    },
    {
      shortDescription: 'Item 3',
      price: '3.00'
    },
    {
      shortDescription: 'Item 4',
      price: '4.00'
    }
  ],
  total: '10.00'
};

export const invalidReceipt = {
  retailer: 'Target',
  // Missing purchaseDate and other required fields
  items: []
};