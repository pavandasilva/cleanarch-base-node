import faker from 'faker'
import { Client } from "./client"

const dataClientFake = {
  id: faker.datatype.uuid(),
  address: faker.address.streetName(),
  cellphone: faker.phone.phoneNumber('###########'),
  phone: faker.phone.phoneNumber('##########'),
  whatsapp: faker.phone.phoneNumber('###########'),
  email: faker.internet.email(),
  slogan: faker.random.words(4),
  title: faker.random.words(1),
}

describe("Client Entity", () => {
  it("Should create a client entity", () => {
    const entity = Client.create(
      dataClientFake.email,
      dataClientFake.phone,
      dataClientFake.cellphone,
      dataClientFake.whatsapp,
      dataClientFake.title,
      dataClientFake.slogan,
      dataClientFake.address,
      dataClientFake.id
    )

    expect(entity.id).toBe(dataClientFake.id)
    expect(entity.title).toBe(dataClientFake.title)
    expect(entity.slogan).toBe(dataClientFake.slogan)
    expect(entity.address).toBe(dataClientFake.address)
    expect(entity.email.getValue()).toBe(dataClientFake.email.toLowerCase())
    expect(entity.phone.getValue()).toBe(dataClientFake.phone)
    expect(entity.cellphone.getValue()).toBe(dataClientFake.cellphone)
    expect(entity.whatsapp.getValue()).toBe(dataClientFake.whatsapp)
  })

  it("Should return email invalid error", () => {
    const invalidEmail = 'test.com'

    expect(() => Client.create(
      invalidEmail,
      dataClientFake.phone,
      dataClientFake.cellphone,
      dataClientFake.whatsapp,
      dataClientFake.title,
      dataClientFake.slogan,
      dataClientFake.address,
      dataClientFake.id
    )).toThrow('Invalid email');
  })

  it("Should return phone invalid error", () => {
    const invalidPhone = '1345677'

    expect(() => Client.create(
      dataClientFake.email,
      invalidPhone,
      dataClientFake.cellphone,
      dataClientFake.whatsapp,
      dataClientFake.title,
      dataClientFake.slogan,
      dataClientFake.address,
      dataClientFake.id
    )).toThrow('Invalid phone');
  })

  it("Should return cellphone invalid error", () => {
    const invalidCellPhone = '12456772'

    expect(() => Client.create(
      dataClientFake.email,
      dataClientFake.phone,
      invalidCellPhone,
      dataClientFake.whatsapp,
      dataClientFake.title,
      dataClientFake.slogan,
      dataClientFake.address,
      dataClientFake.id
    )).toThrow('Invalid cellphone');
  })

  it("Should return cellphone(whatsapp) invalid error", () => {
    const invalidWhatsApp = '12456772'

    expect(() => Client.create(
      dataClientFake.email,
      dataClientFake.phone,
      dataClientFake.cellphone,
      invalidWhatsApp,
      dataClientFake.title,
      dataClientFake.slogan,
      dataClientFake.address,
      dataClientFake.id
    )).toThrow('Invalid cellphone');;
  })
})