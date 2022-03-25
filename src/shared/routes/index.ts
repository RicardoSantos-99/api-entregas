import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { AuthenticateClientController } from '@modules/account/authenticateUser/AuthenticateClientController';
import { Router } from 'express';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClient = new AuthenticateClientController();

routes.post('/client', createClientController.handle);
routes.post('/authenticate', authenticateClient.handle);

export { routes };
