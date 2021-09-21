import { Client } from '../entities';
import { ClientRepository } from "../use-cases/interfaces";
import faker from 'faker'
import { ClientDatabaseMemoryAdapter } from '../adapters';

export type ClientMemoryDataModel = {
  id?: number,
  address: string,
  cellphone: string,
  phone: string,
  whatsapp: string,
  email: string,
  slogan: string,
  title: string
}

export const clientDataModelFakeList: ClientMemoryDataModel[] = [
  {
    id: faker.datatype.number(),
    address: faker.address.streetName(),
    cellphone: faker.phone.phoneNumber('###########'),
    phone: faker.phone.phoneNumber('##########'),
    whatsapp: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    slogan: faker.random.words(4),
    title: faker.random.words(1)
  },
  {
    id: faker.datatype.number(),
    address: faker.address.streetName(),
    cellphone: faker.phone.phoneNumber('###########'),
    phone: faker.phone.phoneNumber('##########'),
    whatsapp: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    slogan: faker.random.words(4),
    title: faker.random.words(1)
  }
]

export class ClientRepositoryMemory implements ClientRepository {
  async getById(id: string): Promise<Client | undefined> {
    const [client] = clientDataModelFakeList.filter(client => String(client.id) === id)
    if (!client) {
      return undefined
    }

    const { email, phone, cellphone, whatsapp, title, slogan, address } = client
    return ClientDatabaseMemoryAdapter.createEntity(email, phone, cellphone, whatsapp, title, slogan, address, id)
  }

  async save(client: Client): Promise<string | undefined> {
    const clientDataModel = ClientDatabaseMemoryAdapter.createModelData(client)
    clientDataModelFakeList.push(clientDataModel)
    return String(client.id)
  }
}