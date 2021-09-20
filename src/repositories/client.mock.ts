import { v4 } from 'uuid'
import { ClientRepository } from "../use-cases/interfaces";
import { ClientPort } from "../use-cases/ports";
import { clientPortFakeList } from "../use-cases/ports/client.fake";

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