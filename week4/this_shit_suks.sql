USE salesorders;
 -- 1.	Show all the information on our customers.
 
SELECT * FROM customers;

-- 2.	Show a list of states, in reverse alphabetical order, where our vendors are located, and include the names of the vendor.

Select VendName,VendState
  FROM salesorders.vendors
 ORDER BY VendState DESC;
 
-- 3.	What if we adjusted the retail price of each product by increasing it 7 percent?
 
 -- update products set RetailPrice = RetailPrice * 1.7
-- where RetailPrice like 'HP%' ;
SELECT ProductName,RetailPrice,RetailPrice * 1.7 FROM products;



-- 4.	Show a list of orders made by each customer in ascending date order.
SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM order_details;

SELECT OrderDate,OrderNumber,CustomerID
FROM orders 
ORDER BY OrderDate ASC;

-- 5.	Give the names of all vendors based in Albany, Anchorage, and Dallas
SELECT VendName,VendorID,VendCity FROM vendors WHERE VendCity IN  ('Albany','Anchorage','Dallas')
;

-- 6.	Show an alphabetized list of products with a quantity on hand greater than or equal to 30.
SELECT* FROM products;
SELECT ProductName,QuantityOnHand FROM products
WHERE QuantityOnHand >= 30 ORDER BY ProductName;
-- 7.	What vendors do we work with that don’t have an email address?
SELECT * FROM vendors
WHERE VendEMailAddress IS NULL;
-- 8.	List employees and the dates their orders shipped sorted by order date.
SELECT * FROM employees
SELECT OrderDate,ShipDate 
FROM orders
ORDER BY OrderDate;
-- SELECT employees,orders FROM ShipDate
-- WHERE OrderDate ORDER BY ShipDate;



-- 9.	Show the vendors and products they supply to us for products over $75 for vendors in Texas. 
SELECT * FROM vendors,products
SELECT VendState,RetailPrice 
     FROM vendors,products
    WHERE RetailPrice >75 
 ORDER BY  VendState DESC, RetailPrice;
-- 10.	Show employees who live in the same city and state as our vendors.
SELECT concat(EmpFirstName, ' ', EmpLastName) as Name,EmpState,EmpCity FROM employees
WHERE EmpCity in (SELECT VendCity from vendors)
and EmpState in (SELECT VendState from vendors);

-- 11.	Display customers who have no sales rep (employees) in the same state.
SELECT concat(CustFirstName, ' ', CustLastName) as Name,CustState From customers
WHERE CustState not in ( SELECT EmpState From employees); 
-- 12.	What is the average quoted price of a helmet?
SELECT * FROM products;
Select ProductName, FORMAT(AVG(RetailPrice), 2) from products WHERE PRODUCTNAME LIKE '%helmet%';

-- 13.	What was the date of the earliest ship date?
select min(shipDate) FROM orders;

-- 14.	What is the total amount (in dollars) of orders from the state of Oregon?

SELECT FORMAT(sum(OrderTotal), 2), CustState 
FROM orders
left join customers
on orders.CustomerID = customers.CustomerID
WHERE CustState = 'OR';



-- 15.	Show each employee, the employee’s total sales (in dollars), the employee’s total sales item quantity, and the average item sales price ordered by the employee’s average item sales price highest to lowest.
  SELECT EmpFirstName,sum(OrderTotal), avg(QuotedPrice), sum(QuantityOrdered)
  FROM order_details
  LEFT JOIN orders
  on order_details.OrderNumber = orders.OrderNumber
  LEFT JOIN employees
  on employees.employeeID = orders.EmployeeID
  group by EmpFirstName
  order by QuotedPrice 
 


