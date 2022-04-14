import { prisma } from '@database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
	username: string;
	password: string;
}

class AuthenticateDeliverymanUseCase {
	async execute({ password, username }: IAuthenticateDeliveryman): Promise<string> {
		const deliveryman = await prisma.deliveryman.findFirst({
			where: {
				username,
			},
		});

		if (!deliveryman) {
			throw new Error('Client not found');
		}

		const passwordMatch = await compare(password, deliveryman.password);

		if (!passwordMatch) {
			throw new Error('Invalid password');
		}

		return sign({ username }, process.env.JWT_SECRET || '', {
			subject: deliveryman.id,
			expiresIn: '1d',
		});
	}
}

export { AuthenticateDeliverymanUseCase };
