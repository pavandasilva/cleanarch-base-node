import { AddClient } from './add-cliente'
import { ClientRepositoryMemory } from '../../repositories'
import { ClientRepository } from '../interfaces'
import faker from 'faker'
import { ClientInputPort } from '../ports'
import { ClientDatabaseMemoryAdapter } from '../../adapters'

interface MakeSutResp {
  sut: AddClient,
  clientRepositoryStub: ClientRepository,
  input: ClientInputPort
}


const makeSut = (): MakeSutResp => {
  const clientRepositoryStub = new ClientRepositoryMemory()
  const sut = new AddClient(clientRepositoryStub)

  const input: ClientInputPort = {
    id: faker.datatype.uuid(),
    address: faker.address.streetName(),
    cellphone: faker.phone.phoneNumber('###########'),
    phone: faker.phone.phoneNumber('##########'),
    whatsapp: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    slogan: faker.random.words(4),
    title: faker.random.words(1)
  }

  return {
    sut,
    clientRepositoryStub,
    input
  }
}

describe("addClient usecase", () => {
  it("Should return the registered client id", async () => {
    const { sut, input } = makeSut()
    const id = await sut.execute(input)
    expect(id).toEqual(input.id)
  })

  it("Should pass the correct data to repository", async () => {
    const { sut, clientRepositoryStub, input } = makeSut()
    const clientRepositorySpy = jest.spyOn(clientRepositoryStub, 'save')
    await sut.execute(input)

    const calledWith = ClientDatabaseMemoryAdapter.createEntity(
      input.email,
      input.phone,
      input.cellphone,
      input.whatsapp,
      input.title,
      input.slogan,
      input.address,
      input.id,
    )

    expect(clientRepositorySpy).toHaveBeenCalledWith(calledWith)
  })


  it("Should return exception if it occurs in the repository", async () => {
    const { sut, clientRepositoryStub, input } = makeSut()
    const clientRepositorySpy = jest.spyOn(clientRepositoryStub, 'save')
    const errorMessage = 'error message'
    clientRepositorySpy.mockImplementationOnce(() => { throw new Error(errorMessage) })
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError(errorMessage)
  })
})
