import { Client } from "../../entities";
import { ClientRepository } from "../interfaces/repository/client-repository";
import { ClientPort } from "../ports";

export class AddClient {
  private readonly clientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository
  }

  async execute(data: ClientPort): Promise<Client> {
    const result = await this.clientRepository.save(data)
    const client = Client.create(result)
    return client
  }
}