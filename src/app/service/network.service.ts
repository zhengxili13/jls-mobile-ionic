import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

export interface NetworkStatus {
  connected: boolean;
  connectionType: string;
}

/**
 * Wraps Capacitor Network plugin for use across the app.
 * Replaces the former @awesome-cordova-plugins/network usage.
 */
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  /**
   * Get current network status.
   * Use status.connected instead of checking type != 'none'.
   */
  async getStatus(): Promise<NetworkStatus> {
    return await Network.getStatus();
  }
}
