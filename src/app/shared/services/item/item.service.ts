import { Injectable } from '@angular/core';
import {HttpService} from '../request/html.service';
import {UserService} from '../user/user.service';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';


/**
 * General Item view of the product includes:
 *    - Item
 *    - Logistic Variant
 *    - Logistic Unit 
 *    - Logistic code (item carton code)
 *    - Sale Variant
 *    - Sale code (item barcode)
 */
export class Item {
   public internalcode: string = '';
   public externalcode: string = '';
   public description: string = '';
   public status: string = '';
   public type: string = '';
   public stockunit: string = '';
   public billingunit: string = '';
   public lvs: LogisticVariant[] = [];
   public svs: SaleVariant[] = [];
}

export class LogisticVariant {
   public internalcode: string = '';
   public externalcode: string = '';
   public fullcode: string = ''; // item code / LV code
   public description: string = '';
   public status: string = '';
   public mainlv: string = ''; // Main replenishned LV
   public type: string = '';
   public flow: string = '';
   public ipck: string = '';
   public pck: string = '';
   public layer: string = '';
   public pallet: string = '';
   public creationdate: string = '';
   public user: string = '';
   public logisticUnit: LogisticUnit[] =[];
   public logisticcode: LogisticCode[] = [];
   public barcode: SaleCode[] =[];
}

export class LogisticUnit {
    public internalcode: string = '';
    public typul: string = '';
    public qty: string = '';
    public unitmeasure: string = '';
    public width: string = '';
    public height: string = '';
    public length: string = '';
    public unitweight: string = '';
    public weight: string = '';
}

export class LogisticCode {
    public cartoncode: string = '';
    public codetype: string = '';
    public codestatus: string = '';
}

export class SaleVariant {
   public internalcode: string = '';
   public externalcode: string = '';
   public status: string = '';
}

export class SaleCode {
    public barcode: string = '';
    public codetype: string = '';
    public codestatus: string = '';
}

/**
 * Purchasing view of the product includes:
 *    - Purchasing
 *    - Cost
 *    - Discount
 */
export class Purchasing {
    public costs: Cost[] = [];
}
export class Cost {
    public site?: any;
    public suppliercode?: any;
    public commercialcode?: any;
    public supplierdescription?: any;
    public mainsupplier?: any;
    public itemcode?: any;
    public itemdescription?: any;
    public lvcode?: any;
    public fullcode?: string;
    public uapp?: any;
    public cost?: any;
    public discounts: Discount [] =[];
}
export class Discount {
    public code?: any;
    public type?: any;
    public unit?: any;
    public amount?: any;
    public uapp?: any;
}

/**
 * Purchasing view of the product includes:
 *    - Purchasing
 *    - Cost
 *    - Discount
 */
export class Pricing {
    public retails: Retail[] = [];
}

export class Retail {
    public pricelist?: any;
    public pricelistdescription?: any;
    public supplierdescription?: any;
    public itemcode?: any;
    public svcode?: any;
    public fullcode ?: any;
    public itemdescription?: string;
    public itemfulldescription?: string; // item code / sv code item description
    public type?: any;
    public permpromo?: any;
    public retail?: any;
    public multi?: any;
    public priority?: any;
    // element below needed for the Calendar widget
    public id?: number;
    public title?: string;
    public start?: any;
    public end?: any;
    public color?: string;
    public allDay: boolean = true;
}

export class Substitution {
    public details: SubDetail[] = [];
}

export class SubDetail {
    public site?: any;
    public rank?: any;
    public start?: any;
    public end?: any;
    public type?: any;
    public typedescription?: any;
    public itemcode?: any;
    public lvcode?: any;
    public fullcode?: string;
    public itemdescription?: any;
    public itemfulldescription?: string; // item code / lv code item description
    public itembycode?: any;
    public lvbycode?: any;
    public fullbycode?: string;
    public itembydescription?: any;
    public itembyfulldescription?: string; // item code / lv code item description
    public coefficient?: any;
}

export class Inventory {
    public details: InventoryDetail[] = [];
}

export class InventoryDetail {
    public site?: any;
    public sitedescription?: any;
    public fullsite?: string;
    public sitetype: any;
    public itemcode?: any;
    public lvcode?: any;
    public fulldescription?: string;
    public pck?: any;
    public itemdescription?: any;
    public inventory?: any;
    public blocked?: any;
    public onorder?: any;
    public inventorystock?: any;
}

@Injectable()
export class ItemService {

  public itemInfo !: Item;
  public purchasingInfo !: Purchasing;
  public pricingInfo !: Pricing;
  public substitutionInfo !: Substitution;
  public inventoryInfo !: Inventory;

  private baseItemUrl: string = '/api/item/';
  private baseRetailUrl: string = '/api/itemretail/';
  private baseRetailSupplierUrl: string = '/api/itemretail/1/';
  private basePurchaseUrl: string = '/api/itemcost/';
  private basePurchaseBySupplierUrl: string = '/api/itemcost/1/';
  private baseSubstitutionUrl: string = '/api/itemsubstitution/';
  private baseInventoryUrl: string = '/api/iteminventory/';
  
  private request!: string;
  private params!: HttpParams;
  private paramsItem!: HttpParams;

 // Pricing color for Calendar widget
  private promoColor: string = '#CD5C5C';
  private regularColor: string = '#4169E1'; // light brown

  constructor(private http : HttpService,private _userService: UserService){ }

    /**
     * This function retrieves the User information.
     * @method getItemInfo
     * @param username 
     * @returns JSON User information object
     */
  getItemInfo (itemCode: string) {
        this.request = this.baseItemUrl;
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        this.params = this.params.set('PARAM', itemCode);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                let data = <any> response;
                let lv: any, sv: any, lu: any, lucode: any, svcode: any;
                this.itemInfo = new Item();
                //console.log('Item data: ' +  data.length + ' => ' + JSON.stringify(data));
                for(let i = 0; i < data.length; i ++) {
                    //console.log ('i: ' + i + ' itemInfo: ' + JSON.stringify(this.itemInfo));
                    //console.log ('i: ' + i + ' data: ' + JSON.stringify(data[i]));
                    if (i === 0 ) {
                       lv = new LogisticVariant();
                       sv = new SaleVariant();
                       lu = new LogisticUnit();
                       lucode = new LogisticCode();
                       svcode = new SaleCode();
                    }
                    else {
                        //console.log('svcode.barcode: ' + svcode.barcode);
                        //console.log('data[i].ARCCODE: ' + data[i].ARCCODE);
                        if (svcode.barcode !== data[i].ARCCODE  && svcode.barcode !== null) {
                           //console.log('Pushing data svcode :' + JSON.stringify(svcode));
                           lv.barcode.push(svcode);
                           svcode = new SaleCode();
                        }
                        //console.log('lucode.cartoncode: ' + lucode.cartoncode);
                        //console.log('data[i].ACUCODE: ' + data[i].ACUCODE);
                        if (lucode.cartoncode !== data[i].ACUCODE && lucode.cartoncode !== null) {
                            console.log('Pushing data lucode');
                            lv.logisticcode.push(lucode);
                            //console.log('Data lucode pushed');
                            lucode = new LogisticCode();
                        }
                        //console.log('data[i].ARUCINL: ' + data[i].ARUCINL);
                        if (lu.internalcode !== data[i].ARUCINL) {
                           lv.logisticUnit.push(lu);
                           lu = new LogisticUnit();
                        }
                        //console.log('data[i].ARLSEQVL: ' + data[i].ARLSEQVL);
                        if (lv.internalcode !== data[i].ARLSEQVL) {
                           this.itemInfo.lvs.push(lv);
                           lv = new LogisticVariant();
                        }
                        //console.log('data[i].ARVCINV: ' + data[i].ARVCINV);
                        if (sv.internalcode !== data[i].ARVCINV) {
                            this.itemInfo.svs.push(sv);
                           sv = new SaleVariant();
                        }
                    }
                    //console.log('General data');
                    this.itemInfo.internalcode = data[i].ARTCINR;
                    this.itemInfo.externalcode = data[i].ARTCEXR;
                    this.itemInfo.description = data[i].TSOBDESC;
                    this.itemInfo.type = data[i].ARTTYPP;
                    

                    //console.log('Logistic pck/layer/pallet');
                    if (data[i].ARUTYPUL=21) { lv.ipck = data[i].ALLCOEFF;}
                    if (data[i].ARUTYPUL=41) { lv.pck = data[i].ALLCOEFF;}
                    if (data[i].ARUTYPUL=61) { lv.layer = data[i].ALLCOEFF;}
                    if (data[i].ARUTYPUL=81) { lv.pallet = data[i].ALLCOEFF;}

                    //console.log('Logistic data');
                    lv.internalcode = data[i].ARLSEQVL;
                    lv.externalcode = data[i].ARLCEXVL;
                    lv.fullcode = data[i].ARTCEXR + '/' + data[i].ARLCEXVL;
                    lv.status = data[i].ARLETAT;
                    lv.mainlv = lv.mainlv || data[i].ARATFOU;
                    lv.type = data[i].ARTTYPP;
                    lv.description = data[i].LVDESC;
                    lv.creationdate = data[i].ARLDCRE;
                    lv.user = data[i].ARLUTIL;

                    //console.log('Sale data');
                    sv.internalcode = data[i].ARVCINV;
                    sv.externalcode = data[i].ARVCEXV;
                    sv.status = data[i].ARVETAT;

                    // LU data copy
                    //console.log('logistic unit');
                    lu.qty = data[i].ALLCOEFF;
                    lu.typul = data[i].ARUTYPUL;
                    lu.internalcode = data[i].ARUCINL;
                    lu.unitmeasure = data[i].ARUUMESS;
                    lu.height = data[i].ARUHAUT;
                    lu.length = data[i].ARULONG;
                    lu.width = data[i].ARULARG;
                    lu.weight = data[i].ARUPBRUT;
                    lu.unitweight = data[i].ARUUPDS;
                    lu.qty = data[i].ALLCOEFF;

                    //console.log('LU code');
                    //lucode copy
                    if (data[i].ACUCODE !== '') {
                        lucode.cartoncode = data[i].ACUCODE;
                        lucode.codetype = data[i].ACUTCOD;
                        lucode.codestatus = data[i].ACUETAT;
                    }

                    //console.log('SU code');
                    //svcode copy
                    if (data[i].ARCCODE !== '') {
                        svcode.barcode = data[i].ARCCODE;
                        svcode.codetype = data[i].ARCTCOD;
                        svcode.codestatus = data[i].ARCETAT;
                    }
                }

                //console.log('Push data final');
                if (svcode.barcode !== null) { lv.barcode.push(svcode); }
                if (lucode.cartoncode !== null) { lv.logisticcode.push(lucode); }
                lv.logisticUnit.push(lu);
                this.itemInfo.lvs.push(lv);
                this.itemInfo.svs.push(sv);

                //console.log('Item => ' + JSON.stringify(this.itemInfo));
                return this.itemInfo;
            }));
  }

 getRetailItemInfo (itemCode: string) {
        this.request = this.baseRetailUrl;
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        this.params = this.params.set('PARAM', itemCode);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);


        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                let data = <any> response;
                let retail;
                this.pricingInfo = new Pricing();
                //console.log('Item data: ' +  data.length + ' => ' + JSON.stringify(data));
                for(let i = 0; i < data.length; i ++) {
                    retail = new Retail();
  
                    retail.pricelist = data[i].AVINTAR;
                    retail.pricelistdescription = data[i].TARIFDESC;
                    retail.itemcode = data[i].ARVCEXR;
                    retail.svcode = data[i].ARVCEXV;
                    retail.fullcode = data[i].ARVCEXR + '/' + data[i].ARVCEXV;
                    retail.itemdescription = data[i].ITEMDESC;
                    retail.itemfulldescription = retail.fullcode + ' ' + retail.itemdescription;
                    retail.type = data[i].AVISTAT;
                    retail.permpromo = data[i].PERMPROMO;
                    retail.retail = data[i].AVIPRIX;
                    retail.multi = data[i].AVIMULTI;
                    retail.priority = data[i].AVOPRIO;

                    retail.id = i; // id is used to retrieve back detail data
                    retail.title = data[i].AVINTAR + ' - ' + data[i].TARIFDESC + ' ' + '$' + data[i].AVIPRIX;
                    if (data[i].AVIMULTI) { retail.title = retail.title + '/' + data[i].AVIMULTI; }
                    retail.start = data[i].AVIDDEB;
                    retail.end = data[i].AVIDFIN;

                    if (data[i].AVISTAT === 1) { retail.color = this.regularColor; }
                    else { retail.color = this.promoColor; }
                    
                    this.pricingInfo.retails.push(retail);
                }
                //console.log('Item => ' + JSON.stringify(this.pricingInfo));
                return this.pricingInfo;
            }));
  }

  getRetailItemInfoBySupplier (warehouseCode: string | number | boolean, supplierCode: string | number | boolean) {
    this.request = this.baseRetailSupplierUrl;
    let headersSearch = new HttpHeaders();
    this.params= new HttpParams();
    this.params = this.params.set('PARAM', warehouseCode);
    this.params = this.params.append('PARAM', supplierCode);
    headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
    headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);


    return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
            let data = <any> response;
            let retail;
            this.pricingInfo = new Pricing();
            //console.log('Item data: ' +  data.length + ' => ' + JSON.stringify(data));
            for(let i = 0; i < data.length; i ++) {
                retail = new Retail();

                retail.pricelist = data[i].AVINTAR;
                retail.pricelistdescription = data[i].TARIFDESC;
                retail.itemcode = data[i].ARVCEXR;
                retail.svcode = data[i].ARVCEXV;
                retail.fullcode = data[i].ARVCEXR + '/' + data[i].ARVCEXV;
                retail.itemdescription = data[i].ITEMDESC;
                retail.itemfulldescription = retail.fullcode + ' ' + retail.itemdescription;
                retail.type = data[i].AVISTAT;
                retail.permpromo = data[i].PERMPROMO;
                retail.retail = data[i].AVIPRIX;
                retail.multi = data[i].AVIMULTI;
                retail.priority = data[i].AVOPRIO;

                retail.id = i; // id is used to retrieve back detail data
                retail.title = data[i].AVINTAR + ' - ' + data[i].TARIFDESC + ' ' + '$' + data[i].AVIPRIX;
                if (data[i].AVIMULTI) { retail.title = retail.title + '/' + data[i].AVIMULTI; }
                retail.start = data[i].AVIDDEB;
                retail.end = data[i].AVIDFIN;

                if (data[i].AVISTAT === 1) { retail.color = this.regularColor; }
                else { retail.color = this.promoColor; }
                
                this.pricingInfo.retails.push(retail);
            }
            //console.log('Item => ' + JSON.stringify(this.pricingInfo));
            return this.pricingInfo;
        }));
}

 getRetailPermanentColor() {
     return this.regularColor;
 }
 getRetailPromoColor() {
     return this.promoColor;
 }
 getPurchaseItemInfo (itemCode: string) {
        this.request = this.basePurchaseUrl;
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        this.params =this.params.set('PARAM', itemCode);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                let data = <any> response;
                let cost: any, discount: any;
                this.purchasingInfo = new Purchasing();
                //console.log('Item data: ' +  data.length + ' => ' + JSON.stringify(data));
                for(let i = 0; i < data.length; i ++) {
                    //console.log ('i: ' + i + ' puchasingInfo: ' + JSON.stringify(this.puchasingInfo));
                    //console.log ('i: ' + i + ' data: ' + JSON.stringify(data[i]));
                    if (i === 0 ) {
                       cost = new Cost();
                       discount = new Discount();
                    }
                    else {
                        if (discount.code !== data[i].TRECEXREM) {
                           cost.discounts.push(discount);
                           discount = new Discount;
                        }
                        if (cost.suppliercode !== data[i].FOUCNUF || 
                            cost.commercialcode !== data[i].FCCNUM  || 
                            cost.lvcode !== data[i].ARLCEXVL || 
                            cost.site !== data[i].TAPSITE) {
                            this.purchasingInfo.costs.push (cost);
                            cost = new Cost();
                        }
                    }
  
                    cost.site = data[i].TAPSITE;
                    cost.suppliercode = data[i].FOUCNUF;
                    cost.supplierdescription = data[i].FOULIBL;
                    cost.commercialcode = data[i].FCCNUM;
                    cost.mainsupplier = data[i].ARATFOU;
                    cost.itemcode = data[i].ARACEXR;
                    cost.itemdescription = data[i].DESC;
                    cost.lvcode = data[i].ARLCEXVL;
                    cost.cost = data[i].TAPPBRUT;
                    cost.fullcode = data[i].ARACEXR + '/' + data[i].ARLCEXVL;
                    cost.uapp = data[i].TAPUAPP;
                    

                    //console.log('Logistic data');
                    discount.code = data[i].TRECEXREM;
                    discount.type = data[i].TRETREM;
                    discount.amount = data[i].AMOUNT;
                    discount.unit = data[i].TREUREM;
                    discount.uapp = data[i].UAPP;
                }

                cost.discounts.push(discount);
                this.purchasingInfo.costs.push(cost);

                //console.log('Item => ' + JSON.stringify(this.purchasingInfo));
                return this.purchasingInfo;
            }));
  }


 getSubstitutionItemInfo (itemCode: string) {
        this.request = this.baseSubstitutionUrl;
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        this.params =this.params.set('PARAM', itemCode);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                let data = <any> response;
                let sub;
                this.substitutionInfo = new Substitution();
                //console.log('Item data: ' +  data.length + ' => ' + JSON.stringify(data));
                for(let i = 0; i < data.length; i ++) {
                    sub = new SubDetail();

                    sub.site = data[i].ARRSITE;
                    sub.rank = data[i].ARRRANG;
                    sub.start = data[i].ARRDDEB;
                    sub.end = data[i].ARRDFIN;
                    sub.type = data[i].ARRTYRE;
                    sub.typedescription = data[i].REMPTYPE;
                    sub.itemcode = data[i].ITEMCODE;
                    sub.lvcode = data[i].LVCODE;
                    sub.fullcode = data[i].ITEMCODE + '/' + data[i].LVCODE;
                    sub.itemdescription = data[i].DESC;
                    sub.itemfulldescription = sub.fullcode + ' ' + data[i].DESC;
                    sub.itembycode = data[i].ITEMBYCODE;
                    sub.lvbycode = data[i].LVBYCODE;
                    sub.fullbycode = data[i].ITEMBYCODE + '/' + data[i].LVBYCODE;
                    sub.itembydescription = data[i].DESCBY;
                    sub.itembyfulldescription = sub.fullbycode + ' ' + data[i].DESCBY;
                    sub.coefficient = data[i].ARRCOEFF;

                    this.substitutionInfo.details.push(sub);
                }

                //console.log('Item => ' + JSON.stringify(this.substitutionInfo));
                return this.substitutionInfo;
            }));
  }

 getInventoryItemInfo (itemCode: string) {
        this.request = this.baseInventoryUrl;
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        this.params = this.params.set('PARAM', itemCode);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                let data = <any> response;
                let inv;
                this.inventoryInfo = new Inventory();
                //console.log('Item data: ' +  data.length + ' => ' + JSON.stringify(data));
                for(let i = 0; i < data.length; i ++) {
                    inv = new InventoryDetail();

                    inv.site = data[i].SOCSITE;
                    inv.sitedescription = data[i].SOCLMAG;
                    inv.fullsite = data[i].SOCSITE + ' - ' + data[i].SOCLMAG;
                    inv.sitetype = data[i].SOCCMAG;
                    inv.itemcode = data[i].ARLCEXR;
                    inv.lvcode = data[i].ARLCEXVL;
                    inv.itemcode = data[i].ARLCEXR;
                    inv.fulldescription = data[i].ARLCEXR + '/' + data[i].ARLCEXVL + ' ' + data[i].DESC; 
                    inv.pck = data[i].PCK;
                    inv.itemdescription = data[i].DESC;
                    inv.inventory = data[i].INVENTORY;
                    inv.blocked = data[i].BLOCK;
                    inv.onorder = data[i].ONORDER;

                    this.inventoryInfo.details.push(inv);
                }

                //console.log('Item => ' + JSON.stringify(this.substitutionInfo));
                return this.inventoryInfo;
            }));
  }
      /**
     * This function retrieves the supplier code.
     * @method getSupplierScheduleServiceContractInfo
     * @param inputInfo 
     * @returns JSON Supplier code information object
     */
    getPurchasingInfoBySupplier (itemCode: string | number | boolean, warehousecode: string | number | boolean, suppliercode: string | number | boolean) {
        this.request = this.basePurchaseBySupplierUrl;
        let headersSearch = new HttpHeaders();
        let options = new HttpHeaders();
        this.params= new HttpParams();
        this.params = this.params.set('PARAM', itemCode);
        this.params = this.params.append('PARAM', warehousecode);
        this.params = this.params.append('PARAM', suppliercode);
        headersSearch = headersSearch.set('DATABASE_SID', this._userService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userService.userInfo.envDefaultLanguage);

        return this.http.get(this.request, this.params, options).pipe(map(response => {
            let data = <any> response;
            return data;
        }));
  }
} 

