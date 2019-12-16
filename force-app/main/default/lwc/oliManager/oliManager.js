import { LightningElement, api, track} from 'lwc';
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

}