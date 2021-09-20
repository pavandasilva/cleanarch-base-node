import faker from "faker";
import { v4 } from 'uuid'
import { ClientPort } from ".";

export const clientPortFake: ClientPort = {
  id: v4(),
  address: faker.address.streetName(),
  cellphone: faker.phone.phoneNumber('###########'),
  phone: faker.phone.phoneNumber('##########'),
  whatsapp: faker.phone.phoneNumber('###########'),
  email: faker.internet.email(),
  slogan: faker.random.words(4),
  title: faker.random.words(1)
}

export const clientPortFakeList: ClientPort[] = [
  {
    id: v4(),
    address: faker.address.streetName(),
    cellphone: faker.phone.phoneNumber('###########'),
    phone: faker.phone.phoneNumber('##########'),
    whatsapp: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    slogan: faker.random.words(4),
    title: faker.random.words(1)
  },
  {
    id: v4(),
    address: faker.address.streetName(),
    cellphone: faker.phone.phoneNumber('###########'),
    phone: faker.phone.phoneNumber('##########'),
    whatsapp: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    slogan: faker.random.words(4),
    title: faker.random.words(1)
  },
  {
    id: v4(),
    address: faker.address.streetName(),
    cellphone: faker.phone.phoneNumber('###########'),
    phone: faker.phone.phoneNumber('##########'),
    whatsapp: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    slogan: faker.random.words(4),
    title: faker.random.words(1)
  },
]

