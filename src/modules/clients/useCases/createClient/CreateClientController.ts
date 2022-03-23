import { Request, Response } from 'express';
import { CreateClientUseCase } from '@modules/clients/useCases/createClient/CreateClientUseCase';

class CreateClientController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		const createClient = new CreateClientUseCase();

		const result = await createClient.execute({
			username,
			password,
		});

		return response.json(result);
	}
}

export { CreateClientController };
