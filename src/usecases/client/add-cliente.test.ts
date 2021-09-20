
import { ClientRepositoryMock } from "../../repositories"
import { clientPortFake } from "../ports/client.fake"
import { AddClient } from './add-cliente'
import { Client } from '../../entities'

describe("addClient usecase", () => {
  it("Should return the registered client", async () => {
    const clientRepository = new ClientRepositoryMock()
    const addClient = new AddClient(clientRepository)
    const { id: entityId, ...entityRest } = Client.create(clientPortFake)
    const { id, ...rest } = await addClient.execute(clientPortFake)
    expect(rest).toEqual(entityRest)
  })

  it("Should pass the correct data to repository", async () => {
    const clientRepository = new ClientRepositoryMock()
    const addClient = new AddClient(clientRepository)
    const clientRepositorySpy = jest.spyOn(clientRepository, 'save')
    await addClient.execute(clientPortFake)
    expect(clientRepositorySpy).toHaveBeenCalledWith(clientPortFake)
  })

  it("Should return exception if it occurs in the repository", async () => {
    const clientRepository = new ClientRepositoryMock()
    const clientRepositorySpy = jest.spyOn(clientRepository, 'save')
    const errorMessage = 'error message'
    clientRepositorySpy.mockImplementationOnce(() => { throw new Error(errorMessage) })
    const addClient = new AddClient(clientRepository)
    const promise = addClient.execute(clientPortFake)
    await expect(promise).rejects.toThrowError(errorMessage)
  })
})
