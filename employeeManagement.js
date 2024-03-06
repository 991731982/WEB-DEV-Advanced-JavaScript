// Create a Person class
// Persons have the following properties:

// fName (string),
// lName(string),
// dob (an object with properties for year, month and day), 
// id (Number)

class person{
    constructor(id,firstName,lastName,DOB){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.DOB=DOB;
    }

    // Person has the following methods :

    get ID(){
        return `${this.id}`;
    };

    // Accessor: fullName.
// It returns the person's full name.

    get fullName(){
        return `${this.firstName} ${this.lastName}`;

    };

    // calculateAge() returns the person's age based on their DOB.

// Hint:
// Date.now() returns the number of milliseconds from January 1, 1970 to now
// new Date(2010, 0, 1) returns the number of milliseconds from January 1, 1970 to 2nd Jan 2010
// Assume there are 31556952000 milliseconds in on year


    calculateAge(){

     // Get the current date
     const today = new Date();
     const currentYear = today.getFullYear();
     const currentMonth = today.getMonth();
     const currentDate = today.getDate();
 
     // Calculate the initial age
     let age = currentYear - this.DOB.year;
 
     // Adjust age if the current date is before the person's birthday this year
     if (currentMonth < this.DOB.month - 1 || (currentMonth === this.DOB.month - 1 && currentDate < this.DOB.day)) {
         age--;
     }
     return age;
    }
}



const person1=new person(1,'Lingxi','Chen',{year:1998,month:10,day:26});

document.getElementById('id').textContent=`ID number:${person1.ID}`;
document.getElementById('fullName').textContent = `Full Name: ${person1.fullName}`;
document.getElementById('age').textContent = `Age: ${person1.calculateAge()}`;


// Create an Employee class that inherits from the Person class
// Employees have the following additional properties:

// hourlyWage (Number)
// hrsWorked (Number default = 0)

class Employee extends person{

    constructor(id,firstName,lastName,DOB, hourlyWage,hrsWorked = 0){
        super(id,firstName,lastName,DOB);
        this.hourlyWage=hourlyWage;
        this.hrsWorked=hrsWorked;    
    }

    // Employee has the following methods :
// Accessors for hourlyWage and hrsWorked (both set and get)


    get hourlyWage (){
        return this._hourlyWage;

    };

    set hourlyWage (value){
        this._hourlyWage = value;
    }

    get hrsWorked (){
        return this._hrsWorked;

    };

    set hrsWorked (value){
        this._hrsWorked = value;
    }
}

// Create a Manager class that inherits from the Person class
// Managers have the following properties:

// managedEmployees (Array of employees that a Manager manages)

class manager extends person{
    constructor(id,firstName,lastName,DOB,managedEmployees ){
        super(id,firstName,lastName,DOB);
        this.managedEmployees=[];
       
    }

// hireEmployee (employee). 
// Accepts an employee instance
// Adds an employee to managedEmployees array
// HINT: myArray.push("write code") adds "write code" to myArray.

    hireEmployee (employee){
        this.managedEmployees.push(employee);
    }

    // fireEmployee(employee).
    // Accepts an employee instance
    // Removes an employee from managedEmployees array
    // This one is tricky!
    // HINT: In order to fire an employee, 
    // loop through the managed employees. 
    // If the managed employee's id matches the employee's (to be fired) id, 
    // remove that employee from  the manages employee array
    
    // You can use a for loop, an if statement, and splice(easy) 
    // const arrayOfNumbers = [1, 2, 3, 4];
    // arrayOfNumbers.splice(1, 1);
    // console.log(arrayOfNumbers); // [1, 3, 4]
    
    // OR you can use the array's filter method (more challenging)
    
    // createPayrollReport(); 
    
    // Accepts no parameters
    
  
      fireEmployee(employee) {
        this.managedEmployees = this.managedEmployees.filter(emp => emp.id !== employee.id);
    }

    // Returns a report (Array of objects);
    // Each object contains an employee's full name and his pay (wage * hrsWorked)
    // HINT: The managedEmployees property contains all the data needed to create the report.



    createPayrollReport() {
        return this.managedEmployees.map(employee => ({
            fullName: employee.fullName,
            age: employee.calculateAge(), 
            pay: employee.hourlyWage * employee.hrsWorked
        }));

    }};

    
    
// Instantiate objects using the classes:
// Create 2 Employee instances,
// "JeanLuc Picard" and "Deanna Troi", for example.
// Make sure to give them your own date of birth, id and wage values. 

const employee1 = new Employee(2,"JeanLuc ", "Picard ", {year: 2001, month: 6, day: 11}, 10, 8);
const employee2 = new Employee(3,"Deanna", "Troi", {year: 1994, month: 2, day: 7}, 20, 6);

// Create one Manager instance
// named "Q", last name is ""

const manager1 = new manager(0,"Q ", "", {year: 1990, month: 10, day: 20}, );

manager1.hireEmployee(employee1);
manager1.hireEmployee(employee2);

// Use the Manager instance to hire the 2 Employees you created above.
// Give Deanna a raise of $5 (using the appropriate instance)

employee2.hourlyWage += 5; // Giving Deanna a raise

// Create a payroll report (using the appropriate instance)
// where JeanLuc worked 45 hours and Deanna worked 46.

// Output the result of the payroll report.

employee1.hrsWorked = 45;
employee2.hrsWorked = 46;

// const payrollReport = manager1.createPayrollReport();

// Fire Jean Luc (using the appropriate instance)
manager1.fireEmployee(employee1);


// Hire a new full time employee named: "William", "Riker" born 5 March 2021.
// You may set his wage and id to values you'd like.
// Riker worked 10  hours.

// Output the result of the new payroll report.


const employee3 = new Employee(4,"William", "Riker", {year: 2021, month: 3, day: 5}, 30, 10); 
manager1.hireEmployee(employee3);

const payrollReport = manager1.createPayrollReport();



function displayInfo() {
    // Employees Section
    const employeesDiv = document.getElementById('employees');
    
    manager1.managedEmployees.forEach(employee => {
        const employeeInfo = document.createElement('p');
        employeeInfo.textContent = `${employee.fullName} - Age: ${employee.calculateAge()} - Wage: ${employee.hourlyWage} - Hours Worked: ${employee.hrsWorked}`;
        employeesDiv.appendChild(employeeInfo);
    });

    // Manager Section
    const managerDiv = document.getElementById('manager');

    const managerInfo = document.createElement('p');
    managerInfo.textContent = `${manager1.fullName} - Managed Employees: ${manager1.managedEmployees.length}`;
    managerDiv.appendChild(managerInfo);

    // Payroll Report Section
    const payrollReportDiv = document.getElementById('payrollReport');
    
    const payrollReport = manager1.createPayrollReport();
    payrollReport.forEach(report => {
        const reportEntry = document.createElement('p');
        reportEntry.textContent = `${report.fullName} - Age: ${report.age} - Salary: ${report.pay}`;
        payrollReportDiv.appendChild(reportEntry);
    });
}

document.addEventListener('DOMContentLoaded', displayInfo);