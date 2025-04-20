// tests/unit/utils/pointCalculator.test.ts
import { calculatePoints } from '../../src/utils/pointCalculator';
import { validReceipt, roundDollarReceipt, multipleItemsReceipt } from '../fixtures/receipts';

describe('Point Calculator', () => {
  it('should calculate points for retailer name', () => {
    const receipt = { ...validReceipt, retailer: 'Target' };
    const points = calculatePoints(receipt);
    // Target has 6 alphanumeric characters
    expect(points).toBeGreaterThanOrEqual(6);
  });

  it('should award 50 points for round dollar amounts', () => {
    const initialPoints = calculatePoints(validReceipt);
    const roundDollarPoints = calculatePoints(roundDollarReceipt);
    
    // roundDollarReceipt has round dollar amount (9.00)
    expect(roundDollarPoints).toBeGreaterThan(initialPoints + 45); // At least 50 points more
  });

  it('should award 25 points for amounts that are multiples of 0.25', () => {
    const receipt = { ...validReceipt, total: '10.25' };
    const regularReceipt = { ...validReceipt, total: '10.20' };
    
    const pointsMultiple = calculatePoints(receipt);
    const pointsRegular = calculatePoints(regularReceipt);
    
    expect(pointsMultiple).toBeGreaterThan(pointsRegular + 20); // At least 25 points more
  });

  it('should award 5 points for every two items', () => {
    const twoItemsPoints = calculatePoints(validReceipt); // 2 items
    const fourItemsPoints = calculatePoints(multipleItemsReceipt); // 4 items
    
    // multipleItemsReceipt has 2 more items which should be at least 5 more points
    expect(fourItemsPoints).toBeGreaterThanOrEqual(twoItemsPoints + 5);
  });
});