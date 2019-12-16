import { LightningElement, api, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import OLI_OBJECT from '@salesforce/schema/OpportunityLineItem';
import UNIT_PRICE from '@salesforce/schema/OpportunityLineItem.UnitPrice';
import SERVICE_DATE from '@salesforce/schema/OpportunityLineItem.ServiceDate';
import QUANTITY from '@salesforce/schema/OpportunityLineItem.Quantity';
import PRODUCT from '@salesforce/schema/OpportunityLineItem.Product2Id';


export default class OliManager extends LightningElement {

    @api recordId;
    @track oppId = this.recordId;
    @track openmodel = false;
    sfdcObject = OLI_OBJECT;
    fields = [PRODUCT, UNIT_PRICE, SERVICE_DATE, QUANTITY]

    openmodal() {
        this.openmodel = true

    }
    closeModal() {
        this.openmodel = false
    } 

    refreshTable(){
        this.template.querySelector('c-oli-table').refreshTable()
    }

    // handles the creation of a new Opportunity Line Item and assign it to the current opportunity record
    handleOLICreated(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.OpportunityId = this.recordId; // Make reference to the current Opportunity Record

        this.template.querySelector('lightning-record-form').submit(fields);

    }

    //Handles the success after saving a new OLI and refreshes the datatable to show new data.
    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Product Created',
                message: 'Record ID: '+event.detail.Id,
                variant: 'success'
            })
        );
        this.refreshTable();
    }


}