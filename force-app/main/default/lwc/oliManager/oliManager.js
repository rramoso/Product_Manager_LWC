import { LightningElement, api, track} from 'lwc';

export default class OliManager extends LightningElement {
    
    @api recordId;
    @track oppId = this.recordId;
}