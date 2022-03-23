import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { routes } from '@shared/routes/index';
import AppError from '@configs/errors/AppError';
import Winston from '@configs/logs/winston';

const logger = new Winston();
const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, _: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	logger.error(`${error.message}`);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

app.listen(3333, () => {
	logger.info('Server started on port 3333');
});
