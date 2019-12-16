import { LightningElement, track, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOLIsByOpp from '@salesforce/apex/OpportunityController.getOLIsByOpp';

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

}