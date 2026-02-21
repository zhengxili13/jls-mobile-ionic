import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iaddress } from '../interface/iaddress';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  defaultShipmentAdress: Iaddress;

  facturationAddress: Iaddress;
  
  facturationAddressBehaviour: BehaviorSubject<Iaddress> = new BehaviorSubject<Iaddress>(null);
  defaultShipmentAdressBehaviour: BehaviorSubject<Iaddress> = new BehaviorSubject<Iaddress>(null);
  
  selectedShipmentAdressBehaviour: BehaviorSubject<Iaddress> = new BehaviorSubject<Iaddress>(null);
  
  constructor() { }
}
