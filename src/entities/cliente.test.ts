import { clientPortFake } from "../use-cases/ports/client.fake"
import { Client } from "./client"

describe("Client Entity", () => {
  it("Should create a client entity", () => {
    const entity = Client.create(clientPortFake)
    expect(entity.id).toBe(clientPortFake.id)
    expect(entity.title).toBe(clientPortFake.title)
    expect(entity.slogan).toBe(clientPortFake.slogan)
    expect(entity.address).toBe(clientPortFake.address)
    expect(entity.email.getValue()).toBe(clientPortFake.email.toLowerCase())
    expect(entity.phone.getValue()).toBe(clientPortFake.phone)
    expect(entity.cellphone.getValue()).toBe(clientPortFake.cellphone)
    expect(entity.whatsapp.getValue()).toBe(clientPortFake.whatsapp)
  })

  it("Should return e-mail invalid error", () => {
    const clientPortFakeEmailInvalid = {
      ...clientPortFake,
      email: 'invalid.email.com'
    }

    expect(() => Client.create(clientPortFakeEmailInvalid)).toThrow('Invalid email');
  })

  it("Should return phone invalid error", () => {
    const clientPortFakeEmailInvalid = {
      ...clientPortFake,
      phone: '32122'
    }

    expect(() => Client.create(clientPortFakeEmailInvalid)).toThrow('Invalid phone');
  })
})