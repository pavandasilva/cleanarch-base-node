import { Router, Request, Response } from 'express';
import { createSendMessage } from '../../factory';
const messageRoutes = Router();

messageRoutes.post('/message', async (req: Request, res: Response) => {
  const { message, receiver } = req.body
  const sendMessageService = createSendMessage()

  try {
    await sendMessageService.sendMessage(message, receiver)


    res.status(201).json({ message: `Mensagem enviada para ${receiver}` })

  } catch (error) {
    res.status(500)
  }
});

export { messageRoutes }