import { Request, Response } from 'express';
import { CreateDeliveryman } from '@modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase';

class CreateDeliverymanController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		const createDeliveryman = new CreateDeliveryman();

		const result = await createDeliveryman.execute({
			username,
			password,
		});

		return response.json(result);
	}
}

export { CreateDeliverymanController };
