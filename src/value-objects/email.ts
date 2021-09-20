export class Email {
  private readonly value: string

  private constructor(email: string) {
    this.value = email
    Object.freeze(this)
  }

  static create(email: string): Email {
    if (!validateEmail(email)) {
      throw new Error('Invalid email')
    }

    return new Email((email.toLowerCase()))
  }

  getValue(): string {
    return this.value
  }
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}