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

  static create(email: string, phone: string, cellphone: string, whatsapp: string, title: string, slogan: string, address: string, id?: string) {
    const nEmail = Email.create(email)
    const nPhone = Phone.create(phone)
    const nCellPhone = CellPhone.create(cellphone)
    const nWhatsapp = CellPhone.create(whatsapp)

    return new Client(
      id,
      title,
      slogan,
      address,
      nEmail,
      nPhone,
      nCellPhone,
      nWhatsapp
    )
  }
}