import { prisma } from '@database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateClient {
	username: string;
	password: string;
}

class CreateClientUseCase {
	async execute({ password, username }: ICreateClient): Promise<ICreateClient> {
		const clientExists = await prisma.clients.findFirst({
			where: {
				username: {
					mode: 'insensitive',
				},
			},
		});

		if (clientExists) throw new Error('Client already exists');

		const hashedPassword = await hash(password, 8);

		const client = await prisma.clients.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return client;
	}
}

export { CreateClientUseCase };
