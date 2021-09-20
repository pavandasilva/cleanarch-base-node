import { Client } from "../../entities";
import { ClientRepository } from "../interfaces/repository/client-repository";

export class GetClient {
  private readonly clientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository
  }

  async execute(clienteId: string): Promise<Client | undefined> {
    const data = await this.clientRepository.getById(clienteId)

    if (!data) {
      return undefined
    }

    const client = Client.create(data)
    return client
  }
}