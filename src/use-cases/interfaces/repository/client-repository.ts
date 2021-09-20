import { ClientPort } from "../../ports/client";

export interface ClientRepository {
  getById: (id: string) => Promise<ClientPort>
  save: (data: ClientPort) => Promise<ClientPort>
}