public with sharing class OpportunityController {
    public OpportunityController() {
        
    }

    @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getOLIsByOpp(Id oppId){
        return [SELECT Id, Product2Id,Product2.Name, ServiceDate, UnitPrice, Quantity, TotalPrice FROM OpportunityLineItem WHERE OpportunityId =: oppId];
    }
}
