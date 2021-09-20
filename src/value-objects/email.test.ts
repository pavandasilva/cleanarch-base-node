import { Email, validateEmail } from "./email";

describe('Email value-object', () => {
  it('Should return a valid email', () => {
    const validEmail = 'rogerio_pavan@hotmail.com'
    const response = Email.create(validEmail)
    const isValidEmail = validateEmail(response.getValue())
    expect(isValidEmail).toBeTruthy()
  })

  it('Should return invalid email', () => {
    const invalidEmail = 'email.com.br'
    expect(() => Email.create(invalidEmail)).toThrow('Invalid email');
  })
});