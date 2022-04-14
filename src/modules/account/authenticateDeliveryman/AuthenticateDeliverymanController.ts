import { Request, Response } from 'express';
import { AuthenticateDeliverymanUseCase } from '@modules/account/authenticateDeliveryman/AuthenticateDeliverymanUseCase';

class AuthenticateDeliverymanController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		const authenticateDeliveryman = new AuthenticateDeliverymanUseCase();

		const result = await authenticateDeliveryman.execute({
			username,
			password,
		});

		return response.json(result);
	}
}

export { AuthenticateDeliverymanController };
