import { v4 } from 'uuid'
import { ClientRepositoryMock } from "../../repositories"
import { GetClient } from "./get-client"
import { clientPortFakeList } from "../ports/client.fake"

describe("getClient usecase", () => {
  it("Should return a client", async () => {
    const clientRepository = new ClientRepositoryMock()
    const getClient = new GetClient(clientRepository)
    const { id, title, slogan, address, email, phone, cellphone, whatsapp } = clientPortFakeList[0]
    const resp = await getClient.execute(id as string)
    expect(resp?.id).toBe(id)
    expect(resp?.title).toBe(title)
    expect(resp?.slogan).toBe(slogan)
    expect(resp?.address).toBe(address)
    expect(resp?.email.getValue()).toBe(email.toLowerCase())
    expect(resp?.phone.getValue()).toBe(phone)
    expect(resp?.cellphone.getValue()).toBe(cellphone)
    expect(resp?.whatsapp.getValue()).toBe(whatsapp)
  })

  it("Should return undefined", async () => {
    const clientRepository = new ClientRepositoryMock()
    const getClient = new GetClient(clientRepository)
    const resp = await getClient.execute(v4())
    expect(resp).toBeUndefined()
  })

  it("Should pass the correct id to repository", async () => {
    const clientRepository = new ClientRepositoryMock()
    const getClient = new GetClient(clientRepository)
    const clientRepositorySpy = jest.spyOn(clientRepository, 'getById')
    const id = clientPortFakeList[0].id
    await getClient.execute(id as string)
    expect(clientRepositorySpy).toHaveBeenCalledWith(id)
  })

  it("Should return exception if it occurs in the repository", async () => {
    const clientRepository = new ClientRepositoryMock()
    const clientRepositorySpy = jest.spyOn(clientRepository, 'getById')
    const errorMessage = 'error message'
    clientRepositorySpy.mockImplementationOnce(() => { throw new Error(errorMessage) })
    const getClient = new GetClient(clientRepository)
    const promise = getClient.execute(v4())
    await expect(promise).rejects.toThrowError(errorMessage)
  })
})
