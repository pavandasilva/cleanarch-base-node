import { v4 } from 'uuid'
import { ClientRepository } from "../usecases/interfaces";
import { ClientPort } from "../usecases/ports";
import { clientPortFakeList } from "../usecases/ports/client.fake";

export class ClientRepositoryMock implements ClientRepository {
  async getById(id: string): Promise<ClientPort> {
    const [client] = clientPortFakeList.filter(port => port.id === id)
    return client
  }

  async save(data: ClientPort): Promise<ClientPort> {
    const id = v4()
    const newClient: ClientPort = {
      ...data,
      id
    }

    clientPortFakeList.push(newClient)
    return newClient
  }
}