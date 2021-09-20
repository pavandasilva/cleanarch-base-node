import { CellPhone, validateCellPhone } from "./cellphone";
describe('Cellphone value-object', () => {
  it('Should return a valid cellphone', () => {
    const validPhone = '14982998429'
    const response = CellPhone.create(validPhone)
    const isvalidCellPhone = validateCellPhone(response.getValue())
    expect(isvalidCellPhone).toBeTruthy()
  })

  it('Should return invalid cellphone', () => {
    const invalidCellPhone = '14345678'
    expect(() => CellPhone.create(invalidCellPhone)).toThrow('Invalid cellphone');
  })
});