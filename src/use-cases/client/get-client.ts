import { ClientRepository } from "../interfaces/repository/client-repository";
import { ClientPortOutput } from "../ports";

export class GetClient {
  private readonly clientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository
  }

  async execute(clienteId: string): Promise<ClientPortOutput | undefined> {
    const client = await this.clientRepository.getById(clienteId)

    if (!client) {
      return undefined
    }

    const output: ClientPortOutput = {
      id: client.id,
      address: client.address,
      cellphone: client.cellphone.getValue(),
      email: client.email.getValue(),
      phone: client.phone.getValue(),
      slogan: client.slogan,
      title: client.title,
      whatsapp: client.whatsapp.getValue(),
    }

    return output
  }
}