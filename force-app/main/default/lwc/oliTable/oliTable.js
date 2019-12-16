import { LightningElement, track, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOLIsByOpp from '@salesforce/apex/OpportunityController.getOLIsByOpp';

import { updateRecord, deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [
    {label: 'Product name', fieldName: 'productName', type: 'text', initialWidth: 225},
    {label: 'Date', fieldName: 'ServiceDate', type: 'date', editable: true, initialWidth: 150},
    {label: 'Sale Price', fieldName: 'UnitPrice', type: 'currency', editable: true},
    {label: 'Quantity', fieldName: 'Quantity', type: 'number', editable: true},
    {label: 'Total', fieldName: 'TotalPrice', type: 'currency'},
];

export default class OliTable extends LightningElement {


    @api oppotunity;
    @track columns = columns;
    @track disableDeleteButton = true;
    @track draftValues = [];
    @track error;
    @track olis;

    _wiredOlis;

    @wire(getOLIsByOpp,{oppId: '$oppotunity'})
    wiredGetOlis(result){
        this._wiredOlis = result;
        if(result.data){


            let currentData = [];
            result.data.map(row => { 
                let rowData = {};
                rowData.Id          = row.Id;
                rowData.ServiceDate = row.ServiceDate;
                rowData.UnitPrice   = row.UnitPrice;
                rowData.Quantity    = row.Quantity;
                rowData.TotalPrice  = row.TotalPrice;
                rowData.productName = row.Product2.Name;
                currentData.push(rowData)
                return rowData;
            });

            this.olis = currentData;
        
            this.error = undefined;
        }else if (result.error) {
            this.error = result.error;
            this.olis = undefined;
        }
    }

    @api
    refreshTable(){

        return refreshApex(this._wiredOlis);
    }


    //Handles the deletion fo OLI records selected in the datatable
    deleteOLIs(){
        const promises = this.selectedRecords.map(oliId => deleteRecord(oliId));
       
        Promise.all(promises).then(() => {
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'All selected products deleted.',
                    variant: 'success'
                })
            );
             // Clear all selected rows
             this.selectedRecords = [];
            
             // Disable Delete button
             this.disableDeleteButton = true;
   
             // Display fresh data in the datatable
            return refreshApex(this._wiredOlis);
        }).catch(error => {
            // Handle error
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.message,
                    variant: 'error'
                })
            );
                
            
        });

    }
    handleSave(event) {

        const recordInputs =  event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
   
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
       
        Promise.all(promises).then(() => {
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'All Opportunity Products updated',
                    variant: 'success'
                })
            );
             // Clear all draft values
             this.draftValues = [];
   
             // Display fresh data in the datatable
            return refreshApex(this._wiredOlis);
        }).catch(error => {
            // Handle error
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.message,
                    variant: 'error'
                })
            );
                
            
        });
    }

     //Handles the row selection and fill the selected records list.
     getSelectedProducts(event){

        const selectedRows = event.detail.selectedRows;
        let oliIds = []
        for(let i = 0; i < selectedRows.length; i ++){
            oliIds.push(selectedRows[i].Id);
        }
        this.selectedRecords = oliIds;
        this.disableDeleteButton = false;

    }

}