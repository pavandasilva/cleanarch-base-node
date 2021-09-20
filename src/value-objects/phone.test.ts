import { Phone } from ".";
import { validatePhone } from "./phone";

describe('Phone value-object', () => {
  it('Should return a valid phone', () => {
    const validPhone = '6236251243'
    const response = Phone.create(validPhone)
    const isvalidPhone = validatePhone(response.getValue())
    expect(isvalidPhone).toBeTruthy()
  })

  it('Should return invalid phone', () => {
    const invalidPhone = '14345678'
    expect(() => Phone.create(invalidPhone)).toThrow('Invalid phone');
  })
});