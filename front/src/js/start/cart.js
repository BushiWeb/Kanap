import { CartControler } from '../controler/CartControler';
import { CONFIG } from '../config/config';

let controler = new CartControler(CONFIG);

controler.initialize();
