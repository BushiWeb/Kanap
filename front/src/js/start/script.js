import { HomeControler } from '../controler/HomeControler';
import { CONFIG } from '../config/config';

let controler = new HomeControler(CONFIG);

controler.initialize();
