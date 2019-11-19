# Bamazon NodeJS App

### What this app does:
This app resembles a store's server-side data processing. Customer purchases are tracked in a database, so the store's real-time inventory and product sales can be viewed by managers/supervisors. Furthermore, managers can view product inventory, update inventory, and add products. Lastly, supervisors can add new departments and view product sales by department. Below are gifs showing how the app works from the 3 different view points.

------------
## Initial Database Configuration 

&nbsp;

### Products Table 

![Products Table in Datbase](./images/fresh-products-table.png)

### Departments Table 

![Departments Table in Database](./images/fresh-departments-table.png)

---------

## General Tasks: 

&nbsp;

### Customer purchasing multiple items

![Customer Shopping](./images/customer-base.gif)

&nbsp;

### Customer purchasing more product than current stock level

![Customer Shopping](./images/customer-out.gif)

&nbsp;

### Manager viewing/updating inventory

![Bamazon Manager](./images/manager-low-add.gif)

&nbsp;

--------- 

## Adding a New Product: 

&nbsp;

### Manager adding a new product

![Bamazon Manager](./images/manager-add-product.gif)

&nbsp;

### Customer purchasing a product created in the app

![Bamazon Manager](./images/customer-new-product.gif)

&nbsp;

### Manager updating inventory for a product created in the app

![Bamazon Manager](./images/manager-updating-new-product.gif)

&nbsp;

--------- 

## Real-Time Product Sales Numbers: 

&nbsp;

### Manager viewing updated product sales numbers after numerous purchases

Simulating numerous customers buying various items

![Bamazon Manager](./images/customer-shopping-spree.gif)

&nbsp;

Here's a still image of the final receipt to verify that the numbers check out later

![Bamazon Manager](./images/shopping-spree-receipt.png)

&nbsp;

Updated manager's view of store inventory after running `node bamazonManager.js` (Remember that all of the quantity numbers started at 100)

![Bamazon Manager](./images/updated-product-sales.png)

&nbsp;

### Supervisor now viewing product sales by department

![Bamazon Manager](./images/supervisor-base.gif)

&nbsp;

Still image of supervisor's departments table in order to verify the numbers

![Bamazon Manager](./images/dept-totals.png)

&nbsp;

--------- 

## Adding a New Department: 

&nbsp;

### Supervisor adding a new department

![Bamazon Manager](./images/supervisor-new-dept.gif)

&nbsp;

### Manager adding a product to the department creaated in the app

![Bamazon Manager](./images/manager-add-product-new-dept.gif)

&nbsp;

### Customer buying the new product and the supervisor viewing the sales numbers in real-time

![Bamazon Manager](./images/customer-to-supe-flow.gif)

&nbsp;

--------- 

## Catching Invalid Inputs:

&nbsp;

### Customer inputting invalid information

![Customer Shopping](./images/customer-invalid.gif)

&nbsp;

### Manager inputting invalid information

![Bamazon Manager](./images/manager-invalid.gif)

&nbsp;

### Supervisor inputting invalid information

![Bamazon Manager](./images/supervisor-invalid.gif)
