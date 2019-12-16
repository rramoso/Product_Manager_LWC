public abstract class TestDataFactory {

    //Opportunity creation
    public static Opportunity createOpportunity(String name, String stageName){
        Opportunity opp =  new Opportunity (Name = name, StageName = stageName, CloseDate=Date.today());
        insert opp;
        return opp;
    }

    //OLI creation
    public static List<OpportunityLineItem> createOpportunityLineItems( Opportunity opp, Integer numProd) {
        
        Id pricebookId = Test.getStandardPricebookId();

       
        //Create your products
        Product2 prod = new Product2(
            Name = 'Dummy Product',
            ProductCode = 'CodeProd',
            isActive = true
        );
        insert prod;

        //Create your pricebook entry
        PricebookEntry pbEntry = new PricebookEntry(
            Pricebook2Id = pricebookId,
            Product2Id = prod.Id,
            UnitPrice = 345.00,
            IsActive = true
        );
        insert pbEntry;

        List<OpportunityLineItem> lstOLI = new List<OpportunityLineItem>();
        for(Integer i = 1; i <= numProd; i++){
            Integer quant = i*2;
            OpportunityLineItem oli = new OpportunityLineItem(
                OpportunityId = opp.Id,
                Quantity = quant,
                PricebookEntryId = pbEntry.Id,
                TotalPrice = quant * pbEntry.UnitPrice
            );
            lstOLI.add(oli);
        }
        insert lstOLI;
        return lstOLI;
    }
}