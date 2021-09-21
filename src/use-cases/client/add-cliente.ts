import { Client } from "../../entities";
import { ClientRepository } from "../interfaces/repository/client-repository";
import { ClientInputPort } from "../ports";

export class AddClient {
  private readonly clientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository
  }

  async execute(input: ClientInputPort): Promise<string | undefined> {
    const { id, email, title, address, cellphone, phone, slogan, whatsapp } = input
    const client = Client.create(email, phone, cellphone, whatsapp, title, slogan, address, id)
    const result = await this.clientRepository.save(client)
    return result
  }
}