import { Injectable } from '@angular/core';
import {HttpService} from '../request/html.service';
import {UserService} from '../user/user.service';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface StoreInventory {
  image_data: any;
  stosite: any;
  soclmag: any;
  dept_id: any;
  dept_desc: any;
  sdept_id: any;
  sdept_desc: any;
  cat_id: any;
  cat_desc: any;
  scat_id: any;
  scat_desc: any;
  itemcode: any;
  item_desc: any;
  qty: any;
  totalcost: any;
  unitcost: any;
  retail: any;
  margin: any;
  lastmvtdate: any;
  lastmvt: any;
  lastsale: any;
  orderableuntil: any;
}

@Injectable()
export class InventoryService {

  public stat : any;

  private baseInventory: string = '/api/iteminventory/';
  private baseStoreInventory: string = '/api/iteminventory/1/';

  // Mode 0 : Use file, Mode: 1 force recalculation
  private MODE: any;
  
  private request!: string;
  private params!: HttpParams;
  private paramsItem!: HttpParams;
  private options!: HttpHeaders;

  constructor(private http : HttpService,private _userService: UserService){ }
  


    /**
     * This function retrieves the Inbetween operation information.
     * @method getMovementsInBetween
     * @param counting date 
     * @param store
     * @returns JSON Detail Counting information object
     */
    getStoreInventory(storeId: string, mode: string) {
      this.request = this.baseStoreInventory;
      this.params= new HttpParams();
      this.options = new HttpHeaders();
      this.params = this.params.set('PARAM', storeId);
      this.params = this.params.set('MODE', mode);
      this.params = this.params.set('STORE', storeId);
      
      return this.http.get(this.request, this.params, this.options).pipe(map(response => {
              let data = <any> response;
              console.log ('Data received');
              return <StoreInventory>data;
          }));
}

}
