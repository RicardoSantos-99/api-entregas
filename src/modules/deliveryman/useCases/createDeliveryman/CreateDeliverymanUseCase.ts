import { prisma } from '@database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateDeliveryman {
	username: string;
	password: string;
}

class CreateDeliveryman {
	async execute({ password, username }: ICreateDeliveryman) {
		const deliverymanExists = await prisma.deliveryman.findFirst({
			where: {
				username: {
					mode: 'insensitive',
				},
			},
		});

		if (deliverymanExists) throw new Error('Deliveryman already exists');

		const hashedPassword = await hash(password, 8);

		const delivery = await prisma.deliveryman.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return delivery;
	}
}

export { CreateDeliveryman };
