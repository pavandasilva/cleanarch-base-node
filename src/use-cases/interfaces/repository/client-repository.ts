import { Client } from "../../../entities";

export interface ClientRepository {
  getById: (id: string) => Promise<Client | undefined>
  save: (client: Client) => Promise<string | undefined>
}
