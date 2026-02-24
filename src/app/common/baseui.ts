import { LoadingController, ToastController } from '@ionic/angular';

export abstract class BaseUI {

    protected async showLoading(loadingCtrl: LoadingController, message: string): Promise<HTMLIonLoadingElement> {
        const loader = loadingCtrl.create({ message });
        (await loader).present();
        return loader;
    }

    protected async showToast(toastCtrl: ToastController, message: string): Promise<HTMLIonToastElement> {
        const toast = toastCtrl.create({
            message,
            duration: 3000,
            position: 'bottom'
        });
        (await toast).present();
        return toast;
    }
}
