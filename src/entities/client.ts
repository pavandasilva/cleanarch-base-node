import { ClientPort } from "../usecases/ports"
import { CellPhone } from "../value-objects"
import { Email } from "../value-objects/email"
import { Phone } from "../value-objects/phone"

export class Client {
  public readonly id: string | undefined
  public readonly title: string
  public readonly slogan: string
  public readonly address: string
  public readonly email: Email
  public readonly phone: Phone
  public readonly cellphone: CellPhone
  public readonly whatsapp: CellPhone

  private constructor(
    id: string | undefined,
    title: string,
    slogan: string,
    address: string,
    email: Email,
    phone: Phone,
    cellphone: CellPhone,
    whatsapp: CellPhone
  ) {
    this.id = id
    this.title = title
    this.slogan = slogan
    this.address = address
    this.email = email
    this.phone = phone
    this.cellphone = cellphone
    this.whatsapp = whatsapp

    Object.freeze(this)
  }

  static create(data: ClientPort) {
    const email = Email.create(data.email)
    const phone = Phone.create(data.phone)
    const cellPhone = CellPhone.create(data.cellphone)
    const whatsapp = CellPhone.create(data.whatsapp)

    return new Client(
      data.id,
      data.title,
      data.slogan,
      data.address,
      email,
      phone,
      cellPhone,
      whatsapp
    )
  }
}