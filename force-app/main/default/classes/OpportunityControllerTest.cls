@isTest
private class OpportunityControllerTest {
    public OpportunityControllerTest() {

    }

    @isTest static void  getOLIsByOppTest(){
        
        // Create Data
        Opportunity opp = TestDataFactory.createOpportunity('Dummy Opp', 'Stage 1');
        List<OpportunityLineItem> lstTestOLI = TestDataFactory.createOpportunityLineItems(opp,5);

        // Perform test
        Test.startTest();
            List<OpportunityLineItem>  testOLIs = OpportunityController.getOLIsByOpp(opp.Id);
        

        system.assertEquals(testOLIs.size(), lstTestOLI.size());
        
        List<OpportunityLineItem> lstTestOLI2 = TestDataFactory.createOpportunityLineItems(opp,10);

        List<OpportunityLineItem>  testOLIs2 = OpportunityController.getOLIsByOpp(opp.Id);
        system.assertEquals(testOLIs2.size(), 15);
        Test.stopTest();

        

    }
}
