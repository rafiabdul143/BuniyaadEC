export const validRegisterPayload = {
  password: 'StrongPassword123!',
  firstName: 'Integration',
  lastName: 'User',
};

export const invalidRegisterPayloads = {
  badEmail: { email: 'not-an-email', password: 'StrongPassword123!' },
  weakPassword: { password: '123' },
  missingFields: { email: 'test@buniyaadec.com' },
};