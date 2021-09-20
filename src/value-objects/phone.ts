export class Phone {
  private readonly value: string

  private constructor(phone: string) {
    this.value = phone
    Object.freeze(this)
  }

  static create(phone: string): Phone {
    if (!validatePhone(phone)) {
      throw new Error('Invalid phone')
    }

    return new Phone(phone)
  }

  getValue(): string {
    return this.value
  }
}

export function validatePhone(phone: string): boolean {
  if (phone.length !== 10) {
    return false
  }

  const re = /^[0-9]/;
  return re.test(String(phone));
}