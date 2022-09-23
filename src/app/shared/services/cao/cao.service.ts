import { Injectable } from '@angular/core';
import {HttpService} from '../request/html.service';
import {UserService} from '../user/user.service';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface CaoConfigLift {
  image_data: any;
  SOCSITE : any;
  SOCLMAG: any;
  DEPT_ID: any;
  DEPT_DESC: any;
  SDEPT_ID: any;
  SDEPT_DESC: any;
  CAT_ID: any;
  CAT_DESC: any;
  SCAT_ID: any;
  SCAT_DESC: any;
  ITEM_ID: any;
  ITEM_DESC: any;
  VENDOR_ID: any;
  VENDOR_DESC: any;
  CGOMODE: any;
  RPANBSEM: any;
  RPADDEB: any;
  RPADFIN: any;
  RPALEVIERC: any;
  RPALEVIERM: any;
  RPACOEF: any;
  LASTUPDATE: any;
  RPAUTIL: any;
}

export interface CaoConfigItem {
IMAGE_DATE: any;
SOCSITE: any;
SOCLMAG: any;
DEPT_ID: any;
DEPT_DESC: any;
SDEPT_ID: any;
SDEPT_DESC: any;
CAT_ID: any;
CAT_DESC: any;
SCAT_ID: any;
SCAT_DESC: any;
ITEM_ID: any;
ITEM_DESC: any;
VENDOR_ID: any;
VENDOR_DESC: any;
CGOMODE: any;
AREQMAX: any;
AREQTEC: any;
ARECOEFFS: any;
ARESECU: any;
ARESTPR: any;
ARESTPRC: any;
LASTUPDATE: any;
AREUTIL: any;
}

export interface CaoConfigAssortment {
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
export class CaoService {

  public stat : any;

  private baseCao: string = '/api/itemcao/';
  private baseCaoConfigLift: string = '/api/itemcao/1/';
  private baseCaoConfigItem: string = '/api/itemcao/2/';
  private baseCaoConfigAssortment: string = '/api/itemcao/2/';
  private baseCaoUpdate: string = '/api/itemcao/4/';

  private baseCaoMissing: string = '/api/itemheicao/1/';
  private baseCaoPredefinedConfiguration: string = '/api/itemheicao/2/';
  private baseCaoStoreType: string = '/api/itemheicao/3/';

  // Mode 0 : Use file, Mode: 1 force recalculation
  private MODE : any;
  
  private request!: string;
  private params!: HttpParams;
  private options!: HttpHeaders;

  constructor(private http : HttpService,private _userService: UserService){ }
  
  /**
   * This function retrieves the Inbetween operation information.
   * @method getCaoConfigLift
   * @param store
   * @param mode  
   * @returns JSON Detail CAO config lift information object
   */
  getCaoConfigLift(storeId: string, mode: string) {
    this.request = this.baseCaoConfigLift;
    this.params= new HttpParams();
    this.options = new HttpHeaders();
    this.params = this.params.set('PARAM', storeId);
    this.params = this.params.set('MODE', mode);
    this.params = this.params.set('STORE', storeId);
    
    return this.http.get(this.request, this.params, this.options).pipe(map(response => {
            let data = <any> response;
            //console.log ('Data received');
            return <CaoConfigItem>data;
        }));
  }
    /**
   * This function retrieves the Inbetween operation information.
   * @method getCaoConfigItem
   * @param store
   * @param mode  
   * @returns JSON Detail CAO config lift information object
   */
  getCaoConfigItem(storeId: string, mode: string) {
    this.request = this.baseCaoConfigItem;
    this.params= new HttpParams();
    this.options = new HttpHeaders();
    this.params = this.params.set('PARAM', storeId);
    this.params = this.params.set('MODE', mode);
    this.params = this.params.set('STORE', storeId);
    
    return this.http.get(this.request, this.params, this.options).pipe(map(response => {
            let data = <any> response;
            //console.log ('Data received');
            return <CaoConfigLift>data;
        }));
  }
    /**
   * This function retrieves the Inbetween operation information.
   * @method getCaoConfigAssortment
   * @param store
   * @param mode  
   * @returns JSON Detail CAO config lift information object
   */
  getCaoConfigAssortment(storeId: string, mode: string) {
    this.request = this.baseCaoConfigAssortment;
    this.params= new HttpParams();
    this.options = new HttpHeaders();
    this.params = this.params.set('PARAM', storeId);
    this.params = this.params.set('MODE', mode);
    this.params = this.params.set('STORE', storeId);
    
    return this.http.get(this.request, this.params, this.options).pipe(map(response => {
            let data = <any> response;
            //console.log ('Data received');
            return <CaoConfigAssortment>data;
        }));
  }

  /**
   * This function retrieves the missing CAO parameter for a vendor/store
   * @method getCaoMissing
   * @param vendor
   * @param storeId
   * @param lastsale  
   * @returns JSON Detail CAO config lift information object
   */
  getCaoMissing(vendorId: string, itemId: string, storeId: string, lastsale: string) {
    this.request = this.baseCaoMissing;
    this.params= new HttpParams();
    this.options = new HttpHeaders();
    this.params = this.params.set('PARAM', vendorId);
    this.params = this.params.append('PARAM', storeId);
    this.params = this.params.append('PARAM', lastsale);
    this.params = this.params.append('PARAM', itemId);
    
    return this.http.get(this.request, this.params, this.options).pipe(map(response => {
            let data = <any> response;
            //console.log ('Data received');
            return data;
        }));
  }

  updateCaoParam(storeId: any, itemCode: any, sv: any, lv: any,  mode: any, pres_stock: any) {
    console.log('updateCaoParam ' + this.baseCaoUpdate, storeId, itemCode, sv, lv,  mode, pres_stock);
    /* 2. Insert into INTARTREAP - Creation/Modification */
    this.request = this.baseCaoUpdate;
    let headersSearch = new HttpHeaders();
    let options = new HttpHeaders();
    this.params= new HttpParams();
    this.params = this.params.set('PARAM', storeId);
    this.params = this.params.append('PARAM', itemCode);
    this.params = this.params.append('PARAM', lv);
    this.params = this.params.append('PARAM', sv);
    this.params = this.params.append('PARAM', mode);
    this.params = this.params.append('PARAM', pres_stock);
    this.params = this.params.append('PARAM',localStorage.getItem('ICRUser')!);

    headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
    headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

    console.log('Parameters Update Cao param: ' + JSON.stringify(this.params));
    return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
            let data = <any> response;
    }));

  }

  getCaoPredefinedConfiguration() {
    /* 2. Get Tony/Jkane file CAO data */
    this.request = this.baseCaoPredefinedConfiguration;
    let headersSearch = new HttpHeaders();
    let options = new HttpHeaders();
    this.params= new HttpParams();
    this.params = this.params.set('PARAM',localStorage.getItem('ICRUser')!);

    headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
    headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);
    return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
            let data = <any> response;
            return data;
    }));
  }

  getCaoStoreType() {
    /* 2. Get Tony/Jkane file CAO data - Store Type only*/
    this.request = this.baseCaoStoreType;
    let headersSearch = new HttpHeaders();
    let options = new HttpHeaders();
    this.params= new HttpParams();
    this.params = this.params.set('PARAM',localStorage.getItem('ICRUser')!);

    headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
    headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);
    return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
            let data = <any> response;
            return data;
    }));
  }
}
