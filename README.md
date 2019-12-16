# OLI Manager

This is Lightning Web Component for the Opportunity record page. It allows the Adding, Editing and Deleting of Opportunity Products related to an Opportunity.

# How to run the code

### Installing OLI Manager using a Scratch Org
  1. Set up your environment. Follow the steps in the Quick Start: [Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    * Enable Dev Hub in your Trailhead Playground
    * Install Salesforce CLI
    * Install Visual Studio Code
    * Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

  2. If you haven't already done so, authenticate with your hub org and provide it with an alias (######quixhub in the command below):

  ```bash
  sfdx force:auth:web:login -d -a quixhub
  ```
  3. Clone the Product Manager repository:

  ```bash
  git clone https://github.com/rramoso/Product_Manager_LWC.git
  cd Product_Manager_LWC
  ```

  4. Create a scratch org and provide it with an alias (######productmanager in the command below):

  ```bash
  sfdx force:org:create -s -f config/project-scratch-def.json -a productmanager
  ```

  5. Push the app to your scratch org:

  ```bash
  sfdx force:source:push
  ```

  6. Open the scratch org:
  ```bash
  sfdx force:org:open
  ```

# Architecture
The OLI Manager component allows to Add/Delete/Edit any opportunity line item inside an Opportunity’s record page.

## OLI Manager

This is the main component to be used in an Opportunity record page only. It contains:

 * Add OLI button: it brings a modal with the Opportunity Line Item record form, after submitting it creates an OLI record related to the Opportunity its in, this is being handled in handleOLICreated function. After the record is created the manager calls for a refresh of the data table.

* it renders the OLI Table passing the opportunity record id as a parameter in the c-tag.

## OLI Table

This component renders a datatable of all the Opportunity Line Items related to the Opportunity record page it’s open. It shows the Product Name, Unit Price, Service Date, Quantity and Total fields. It contains an initially disabled Delete button.

### Show Data
The data it’s retrieved via a wired function called wiredGetOlis, passing the opportunity record id to an Apex function named getOLIsByOpp. The data returned it’s being handled so the Product.Name field can be reached and returned to the component.

### Inline Edit
The inline editing is available to the Unit Price, Service Date and Quantity fields. After modification the user can save or cancel the edit values. If saved the function handleSave is called, and it updates the records using the lightning UI function updateRecord.

### Delete
When selecting rows the getSelectedProducts fills an Array named, selectedRecords, with the Ids of the selected records. And enable the Delete button.

After clicking the Delete button, the deleteOLIs function use the lightning UI function deleteRecord to delete all records base in the the selectedRecord array

### Refresh data

An api function called refreshTable its being use to refresh the datatable data, using the 
refreshApex function from salesforce, refreshing the wiredOlis property. This function its public so it can be called from outside this component, in the OLI Manager component. This way every time any event made in the component, this function its called and refreshes the data shown.

# If I had more time, what would I like to improve?

I would make sure which is more eficcient to delete, if by the lightning functions used here or via a wired function to an apex class passing by the records id. The research I did on this was short. 
I would improve the look and the interactions of the buttons and the ShowToastEvent message to include a link to the record when adding a new OLI.
Create more functionalities like sorting and pagination into the datatable.
