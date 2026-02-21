

import { LoadingController, ToastController } from '@ionic/angular';

export abstract class BaseUI {
    constructor() {

    }
    protected async showLoading(loadingCtrl: LoadingController, message: string): Promise<HTMLIonLoadingElement> {
        let loader = loadingCtrl.create(
            {
                message: message,
            }
        );
        (await loader).present();
        return loader;
    }

    protected async showToast(toastCtrl: ToastController, message: string): Promise<HTMLIonToastElement> {
        let toast = toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        (await toast).present();
        return toast;
    }
} 
