import { Injectable } from '@angular/core';
import {HttpService} from '../request/html.service';
import {UserService} from '../user/user.service';
import { map } from 'rxjs/operators';
import { HttpParams, HttpHeaders } from '@angular/common/http';


export class Labels {
   public label: Label[] = [];
}
export class Label {
   public LABID: any; 
   public LABTYPE: any;
   public LABDESC: any;
   public LABLANG: any;
   public LABDCRE: any;
   public LABDMAJ: any;
   public LABUTIL: any;
}

@Injectable()
export class LabelService {

  public labels !: Labels;

  private baseLabelsUrl: string = '/api/labels/';
  private language!: string;
  
  private request!: string;
  private params!: HttpParams;

  constructor(private http : HttpService,private _userService: UserService){ }

    /**
     * This function retrieves the Inbetween operation information.
     * @method getMovementsInBetween
     * @param counting date 
     * @param store
     * @returns JSON Detail Counting information object
     */
  getAllLabels() {
        this.request = this.baseLabelsUrl;
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                this.labels = new Labels();
                let data = <any> response;
                //console.log('Data labels : ' + JSON.stringify(data));
                if (data.length > 0) { Object.assign(this.labels.label , data); }
                //console.log ('Load finish labels - ' + JSON.stringify(this.labels));
                return this.labels;
        }));
  }


  getAllLabelsPromise() {
      return new Promise((resolve, reject) => {
        let labels = this.getAllLabels().subscribe((user) => {
          setTimeout(() => { resolve(labels); }, 500);
            });
        });
    }


    /**
     * This function set the language to be used.
     * @method use
     * @param language 
     * @returns labels in the user language
     */
    public use (language: string) {
        this.language = language;
    }

} 

