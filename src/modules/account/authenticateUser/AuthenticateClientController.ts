import { Request, Response } from 'express';
import { AuthenticateClientUseCase } from '@modules/account/authenticateUser/AuthenticateClientUseCase';

class AuthenticateClientController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		const authenticateClient = new AuthenticateClientUseCase();

		const result = await authenticateClient.execute({
			username,
			password,
		});

		return response.json(result);
	}
}

export { AuthenticateClientController };
