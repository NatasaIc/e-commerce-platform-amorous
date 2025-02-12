export const orderTestData = {
  user: '67a89a6bb50714bd01c362a3', // The ObjectId of the user placing the order
  products: [
    {
      product: '67a89a6bb50714bd01c36297', // The ObjectId of the product
      quantity: 2,
      price: 25.99,
      name: 'Moisturizing Facial Cream',
    },
    {
      product: '67a89a6bb50714bd01c36298', // Another product's ObjectId
      quantity: 1,
      price: 45,
    },
  ],
  totalPrice: 96.98, // Total price for all products (2 * 25.99 + 1 * 45)
  status: 'Pending',
  shippingAdress: '1234 Main St, Springfield, IL, 62701',
  paymentMethod: 'Credit Card',
  createdAt: '2025-02-06T08:00:00Z',
  updatedAt: '2025-02-06T08:00:00Z',
};
