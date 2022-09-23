import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import { WarehouseService, WidgetService, ExportService, ImportService } from '../../../shared/services';
import {DatePipe} from '@angular/common';



import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';


import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


/**
 * 
 * @author Ahmed Benamrouche
 * 
 */

@Component({
	moduleId: module.id,
    selector: 'item-hierarchy',
    templateUrl: './item.hierarchy.component.html',
    providers: [WarehouseService, WidgetService, MessageService, ExportService, ImportService],
    styleUrls: ['./item.hierarchy.component.scss', '../../../app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ItemHierarchyComponent implements OnInit{

    @ViewChild('fileUpload') fileUpload: any;
    @ViewChild('result') resultTable!: Table;

   // Menu/Qorkflow list
   activeIndex: number = 0;
   menuItems: MenuItem[] = [];
   uploadedFiles: any[] = [];

   templateID = 'ICR_TEMPLATE001';
   toolID = 1;

   indicatorXLSfileLoaded: boolean = false;

   workbook: any;
   

   datePipe: DatePipe;
   dateNow: Date;
   dateTomorrow: Date;

   startDate;
   scheduleDate;
   defaultStartDate;
   itemTrace;
   scheduleFlag: boolean = false;
   /** Validation Message */
   displayUpdateCompleted: boolean = false;
   msgFinalDisplayed: any;

   missingData: any;

   screenID;
   searchButtonEnable: boolean = true; // Disable the search button when clicking on search in order to not overload queries

  // Search action
 
  searchCode: any;
  search: any;

  globalError: any[] = [];
  globalValid: any[] = [];
  displayConfirm: boolean;

  constructor(private _widgetService: WidgetService, private _messageService: MessageService,
              private _exportService: ExportService, public _importService: ImportService,
              private httpClient: HttpClient) {
    this.datePipe     = new DatePipe('en-US');
    this.dateNow = new Date();
    this.dateTomorrow =  new Date(this.dateNow.setDate(this.dateNow.getDate() + 1));
    this.defaultStartDate = new Date(this.dateNow.setDate(this.dateNow.getDate() -2));
    this.startDate = new Date(this.dateNow.setDate(this.dateNow.getDate() -2));

    this.scheduleDate = new Date();
    this.itemTrace = true;
    this.scheduleFlag = false;
    this.screenID = 'SCR0000000008';
    this.activeIndex = 0;
    this.displayConfirm = false;
    this.globalError = [];
    this.globalValid = [];
    this.displayUpdateCompleted = false;
  }


  ngOnInit() {
      this.menuItems = [{
              id: 'step0',
              label: 'Data selection',
              title: 'Pick your item hierarchy file',
              command: (event: any) => {
                  this.activeIndex = 0;
                  this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Pick your data file item-hierarchy', detail: event.item.label});
              }
          },
          {
              id: 'step1',
              label: 'Configuration',
              title: 'Define changes parameter',
              command: (event: any) => {
                this.activeIndex = 1;
                  this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Specify change configuration', detail: event.item.label});
              }
          },
          {
              id: 'step2',
              label: 'Execution/Schedule',
              title: 'Execute now or schedule the change',
              command: (event: any) => {
                  this.activeIndex = 2;
                  this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Execute or Schedule change', detail: event.item.label});
              }
          },
          {
              id: 'step3',
              label: 'Confirmation',
              title: 'Confirmation for execution/planification',
              command: (event: any) => {
                  this.activeIndex = 3;
                  this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Wrap up', detail: event.item.label});
              }
          }
      ];
  }

  onBeforeUpload(event:any) {
    console.log('Before upload :', event);
  }

  onUploadCompleted(event:any) {
    //console.log('Upload completed :', event);
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        this._messageService.add({severity: 'info', summary: 'File Uploaded', detail: file});
    }

    //this.fileUpload.clear();
  }

    onSelect(event:any) {
        this.activeIndex = 0; // Go next step;
        this.uploadedFiles = [];
        this.displayConfirm = false;
        let formData: FormData = new FormData();
        this.indicatorXLSfileLoaded = false;
        try {   
            for(let i =0; i < event.currentFiles.length; i++) {
                //console.log('event.currentFiles:', event.currentFiles[i]);
                this.uploadedFiles.push(event.currentFiles[i]);
                this._messageService.add({severity: 'info', summary: 'In progress file load', detail: event.currentFiles[i].name});
                
            }

            this.fileUpload.clear();
            this._importService.getExcelFile(this.uploadedFiles[0])
                    .subscribe ((data: any) => {  
                                },
                                (error: any) => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Invalid file during loading', detail: error }); },
                                () => { 
                                        this.indicatorXLSfileLoaded = true;
                                        this._messageService.add({key:'top', sticky:true, severity:'success', summary:'Data file loaded', detail:  
                                                                '"' + this.uploadedFiles[0].name + '" worksheet loaded.' }); 

                                        // add comments field
                                        this._importService.addColumns('COMMENTS', '');
                                        //console.log('sheets :', this._importService.wb.sheets);
                                        this.displayConfirm = this.checkGlobal();

                                }
                            );

        } catch (error: any) {
            this._messageService.add({key:'top', sticky:true, severity:'error', summary:'ERROR file loading message', detail: error }); 
        }
    }

    getTemplate() {
    let existTemplate: any;
    this._importService.getTemplate(this.templateID)
    .subscribe (data => {  
                existTemplate = data !== -1;
                console.log('data getTemplate :', data);
                },
                error => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Template error', detail: error }); },
                () => { 
                        if (existTemplate) {
                            this._messageService.add({key:'top', sticky:true, severity:'success', summary:'Template file', detail:  
                                                    'File Item Merchandise Hierrarchy downloaded.' }); 
                        } else {
                            this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Template error', detail: 'Template file ' + this.templateID + ' can not be found' });
                        }
                }
            );

  }

  validationChanges() {
    // To be implemented
    //console.log('validationChanges', this._importService.wb.sheets[0]);

    let executionId: any;
    let userID: any;
    this.displayUpdateCompleted = false;
    if (this.checkGlobal()) {
        this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Step 1/4: Posting the execution plan', detail:  '"' + this.uploadedFiles[0].name + '" processing plan is being posted.'});
        this._importService.postExecution(this.uploadedFiles[0].name, this.toolID,
                            this.datePipe.transform(this.startDate,'MM/dd/yy'), 
                            +this.itemTrace, // Implicit cast to have 1: True, 0: False
                            + !this.scheduleFlag, // Implicit cast to have 1: True, 0: False
                            this.datePipe.transform(this.scheduleDate,'MM/dd/yy HH:mm'), 
                            JSON.stringify(this._importService.wb.sheets[0].worksheet.rows),
                            this._importService.wb.sheets[0].worksheet.rows.length)
                            .subscribe (data => {  
                            executionId = data;
                            console.log('executionId : ', executionId);
                        },
                        error => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Invalid file during execution plan load', detail: error }); },
                        () => { 
                    if (this.scheduleFlag) {
                        this._messageService.add({key:'top', sticky:true, severity:'success', summary:'Step 2/2: Data file execution plan', detail:  
                                                    '"' + this.uploadedFiles[0].name + '" worksheet loaded for scheduled execution.' }); 
                    }
                    else {
                        // Execute the file
                        if(executionId.RESULT[0] < 0 ) {
                            this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Execution failure', detail: executionId.MESSAGE[0] }); 
                            return;
                        }
                        /** Run the job integration */
                        this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Step 2/4: Executing plan', detail:  this.uploadedFiles[0].name + ' processing plan is now being executed.'});
                        this._importService.execute(executionId.RESULT[0]).subscribe 
                                (data => {  
                                    //console.log('data userID : ', data);
                                    userID = data[0].RESULT;
                                },
                                error => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Invalid file during execution plan load', detail: error }); },
                                () =>    {  
                                            
                                    this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Step 3/4: Executing plan', detail: '"' + this.uploadedFiles[0].name + '" processing plan completed. Collecting  final integration result.'});
                                    this._importService.executePlan(userID, this.toolID).subscribe( 
                                            data => {  },
                                            error => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Execution issue', detail: error }); },
                                            () => {  this._importService.collectResult(executionId.RESULT[0]).subscribe (
                                                    data => { },
                                                    error => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Invalid file during execution plan load', detail: error }); },
                                                    () => { 
                                                        this._messageService.add({key:'top', sticky:true, severity:'info', summary:'Step 4/4: Executing plan', detail:  '"' + this.uploadedFiles[0].name + '" processing plan results collected.'});
                                                        this.msgFinalDisplayed = 'Item - Merchandise  ' + this.uploadedFiles[0].name + ' - ' + 
                                                                                ' has been successfully processed.';
                                                        this.displayUpdateCompleted = true;
                                                    });
                                                });
                                        });                     
                            }
                        });
                    } 
        else {
                this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Required data missing', detail: this.missingData }); 
        }
    }

  /**
   * 
   */
  confirmFile() {
    //console.log('confirmFile', this._importService.wb.sheets[0]);
    this.activeIndex = 0;
    this.globalError = [];
    if (this.checkGlobal()) {
        this._importService.checkFile(this.uploadedFiles[0].name, this.toolID,
                                    JSON.stringify(this._importService.wb.sheets[0].worksheet.rows))
                .subscribe (data => {  
                        //console.log('data: ', data, this._importService.wb.sheets[0].worksheet.rows);
                            this._importService.wb.sheets[0].worksheet.rows = data;
                        },
                        error => { this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Invalid file during check', detail: error }); },
                        () => { 

                                this._messageService.add({key:'top', sticky:true, severity:'success', summary:'Content verification', detail:  
                                                            this.uploadedFiles[0].name + ' data file content check completed.' }); 
                                //console.log('sheets :', this._importService.wb.sheets);
                                let rowsWithError = this._importService.wb.sheets[0].worksheet.rows.filter((item: { COMMENTS: string | null; }) => item.COMMENTS !== '' && item.COMMENTS !== null);
                                //console.log('rowsWithError: ', rowsWithError);
                                if (rowsWithError.length === 0) {
                                    this.globalValid = [];
                                    this.globalValid.push('<i class="fas fa-thumbs-up" style="padding-right: 1em;"></i> Data file verification SUCCESSFUL ' +
                                                            ' <ul style="margin-bottom: 0px;"> ' +
                                                            ' <li>Columns naming is respected</li>' +
                                                            ' <li>Item codes are all recognized</li>' +
                                                            ' <li>Merchandise hierarchy codes are all recognized</li></ul>'); 
                                    this.activeIndex = this.activeIndex + 1; // Enable Configuration
                                    this.activeIndex = this.activeIndex + 1; // Enable schedule
                                    this.activeIndex = this.activeIndex + 1; // Enable Recap

                                    let MS_PER_MINUTE = 60000;
                                    this.dateNow = new Date( new Date().getTime() + 5*MS_PER_MINUTE);
                                }
                                else {
                                    this.globalError.push('File contains ' + rowsWithError.length + ' errors. Review red highlighted rows with error in comments.'); 
                                    //this.resultTable.sortColumn = this.resultTable.columns.find(col => col.field === 'COMMENTS');
                                    this.resultTable.sortOrder = -1;
                                    this.resultTable.sortField = 'COMMENTS';
                                    this.resultTable.sortSingle();
                                }
                        }
                    );
        }
        else {
                this._messageService.add({key:'top', sticky:true, severity:'error', summary:'Required data missing', detail: this.missingData }); 
        }
    }

  /**
   * Function to check that required data are fulfilled. If not return false.
   * @returns True if required data, else false
   */
  checkGlobal(): boolean {
    this.globalError=[];
    let result = true;
    if (this._importService.wb.sheets[0].worksheet.columns[0].field.toUpperCase() !== 'ITEM_CODE') {
      this.globalError.push('The column A header must be named ITEM_CODE'); 
      result = false;
    }
    if (this._importService.wb.sheets[0].worksheet.columns[1].field.toUpperCase() !== 'NEW_HIERARCHY') {
        this.globalError.push('The column B header must be named NEW_HIERARCHY'); 
      result = false;
    }

    return result;
  }
 
}