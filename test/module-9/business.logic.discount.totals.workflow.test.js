const { test, expect } = require('@playwright/test');

// Module 9: Backend SQA Skill - Business Logic
//
// Easy explanation:
// - We test discount rules, total calculations, and workflow steps.
// - This catches bugs that UI tests often miss.

function calculateOrderTotal(items, discountPercent, shippingFee) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount + shippingFee;

  return {
    subtotal,
    discountAmount,
    total: Number(total.toFixed(2))
  };
}

function canMoveToNextStep(currentStep, action) {
  const transitions = {
    cart: 'address',
    address: 'payment',
    payment: 'review',
    review: 'confirmed'
  };

  if (action !== 'next') {
    return false;
  }

  return Boolean(transitions[currentStep]);
}

test.describe('Module 9 - Business Logic', () => {
  test('validates discount and final order total', async () => {
    const items = [
      { name: 'Laptop Bag', price: 1000, qty: 2 },
      { name: 'Mouse', price: 500, qty: 1 }
    ];

    const result = calculateOrderTotal(items, 10, 50);

    // Subtotal = 2500, discount = 250, shipping = 50 => final total = 2300
    expect(result.subtotal).toBe(2500);
    expect(result.discountAmount).toBe(250);
    expect(result.total).toBe(2300);
  });

  test('validates workflow step progression', async () => {
    expect(canMoveToNextStep('cart', 'next')).toBeTruthy();
    expect(canMoveToNextStep('address', 'next')).toBeTruthy();
    expect(canMoveToNextStep('review', 'next')).toBeTruthy();

    // Invalid transition action should fail.
    expect(canMoveToNextStep('payment', 'skip')).toBeFalsy();
  });
});
