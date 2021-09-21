import { v4 } from 'uuid'
import { clientDataModelFakeList, ClientRepositoryMemory } from "../../repositories"
import { GetClient } from "./get-client"
import { ClientRepository } from '../interfaces'

interface MakeSutResp {
  sut: GetClient,
  clientRepositoryStub: ClientRepository,
}

const makeSut = (): MakeSutResp => {
  const clientRepositoryStub = new ClientRepositoryMemory()
  const sut = new GetClient(clientRepositoryStub)

  return {
    sut,
    clientRepositoryStub,
  }
}

describe("getClient usecase", () => {
  it("Should return a client", async () => {
    const { sut } = makeSut()
    const { id, title, slogan, address, email, phone, cellphone, whatsapp } = clientDataModelFakeList[0]
    const resp = await sut.execute(String(id))
    expect(resp?.id).toBe(String(id))
    expect(resp?.title).toBe(title)
    expect(resp?.slogan).toBe(slogan)
    expect(resp?.address).toBe(address)
    expect(resp?.email).toBe(email.toLowerCase())
    expect(resp?.phone).toBe(phone)
    expect(resp?.cellphone).toBe(cellphone)
    expect(resp?.whatsapp).toBe(whatsapp)
  })

  it("Should return undefined", async () => {
    const { sut } = makeSut()
    const resp = await sut.execute(v4())
    expect(resp).toBeUndefined()
  })

  it("Should pass the correct id to repository", async () => {
    const { sut, clientRepositoryStub } = makeSut()
    const clientRepositorySpy = jest.spyOn(clientRepositoryStub, 'getById')
    const id = v4()
    await sut.execute(id)
    expect(clientRepositorySpy).toHaveBeenCalledWith(id)
  })

  it("Should return exception if it occurs in the repository", async () => {
    const { sut, clientRepositoryStub } = makeSut()
    const clientRepositorySpy = jest.spyOn(clientRepositoryStub, 'getById')
    const errorMessage = 'error message'
    clientRepositorySpy.mockImplementationOnce(() => { throw new Error(errorMessage) })
    const promise = sut.execute(v4())
    await expect(promise).rejects.toThrowError(errorMessage)
  })
})
