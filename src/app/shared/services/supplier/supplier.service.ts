import { Injectable } from '@angular/core';
import {HttpService} from '../request/html.service';
import {UserService} from '../user/user.service';
import {DatePipe} from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpParams, HttpHeaders } from '@angular/common/http';

  

@Injectable()
export class SupplierService {

  private baseSupplierUrl: string = '/api/supplier/1/';
  
  private request!: string;
  private params!: HttpParams;
  private paramsItem!: HttpParams;
  private options!: HttpHeaders;

  constructor(private http : HttpService,private _userService: UserService, private datePipe: DatePipe){ }

    /**
     * This function retrieves the supplier code.
     * @method getSupplierScheduleServiceContractInfo
     * @param inputInfo 
     * @returns JSON Supplier code information object
     */
  getSupplierCode (inputInfo: string) {
        this.request = this.baseSupplierUrl;
        let headersSearch = new HttpHeaders();
        let options = new HttpHeaders();
        this.params= new HttpParams();
        this.params = this.params.set('PARAM', inputInfo);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, this.options).pipe(map(response => {
            let data = <any> response;
            //this._userService.setNetwork(this.network, this.networkTree);
            return data;
        }));
  }



}
