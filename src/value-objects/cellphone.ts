export class CellPhone {
  private readonly value: string

  private constructor(cellPhone: string) {
    this.value = cellPhone
    Object.freeze(this)
  }

  static create(cellPhone: string): CellPhone {
    if (!validateCellPhone(cellPhone)) {
      throw new Error('Invalid cellphone')
    }

    return new CellPhone(cellPhone)
  }

  getValue(): string {
    return this.value
  }
}

export function validateCellPhone(cellPhone: string): boolean {
  if (cellPhone.length !== 11) {
    return false
  }

  const re = /^[0-9]/;
  return re.test(String(cellPhone));
}