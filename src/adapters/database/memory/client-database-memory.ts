import { Client } from "../../../entities";
import { ClientMemoryDataModel } from '../../../repositories';

export class ClientDatabaseMemoryAdapter {
  static createEntity(email: string, phone: string, cellphone: string, whatsapp: string, title: string, slogan: string, address: string, id?: string): Client {
    return Client.create(email, phone, cellphone, whatsapp, title, slogan, address, id)
  }

  static createModelData(client: Client): ClientMemoryDataModel {
    const clientDataModel: ClientMemoryDataModel = {
      id: Number(client.id),
      address: client.address,
      cellphone: client.cellphone.getValue(),
      phone: client.phone.getValue(),
      whatsapp: client.whatsapp.getValue(),
      email: client.email.getValue(),
      slogan: client.slogan,
      title: client.title
    }

    return clientDataModel
  }
}

