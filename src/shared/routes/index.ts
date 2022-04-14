import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { AuthenticateClientController } from '@modules/account/authenticateUser/AuthenticateClientController';
import { AuthenticateDeliverymanController } from '@modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliverymanController } from '@modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { Router } from 'express';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClient = new AuthenticateClientController();
const createDeliveryman = new CreateDeliverymanController();
const authenticateDeliveryman = new AuthenticateDeliverymanController();

routes.post('/client', createClientController.handle);
routes.post('/client/authenticate', authenticateClient.handle);
routes.post('/deliveryman/authenticate', authenticateDeliveryman.handle);
routes.post('/deliveryman', createDeliveryman.handle);

export { routes };
