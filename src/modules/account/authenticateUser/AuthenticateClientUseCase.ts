import { prisma } from '@database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
	username: string;
	password: string;
}

class AuthenticateClientUseCase {
	async execute({ password, username }: IAuthenticateClient) {
		const client = await prisma.clients.findFirst({
			where: {
				username,
			},
		});

		if (!client) {
			throw new Error('Client not found');
		}

		const passwordMatch = await compare(password, client.password);

		if (!passwordMatch) {
			throw new Error('Invalid password');
		}

		return sign({ username }, process.env.JWT_SECRET || '', {
			subject: client.id,
			expiresIn: '1d',
		});
	}
}

export { AuthenticateClientUseCase };
