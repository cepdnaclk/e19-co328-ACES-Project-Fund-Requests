___
# ACES Project Fund Requests
<p align="center">
  <img src="./docs/images/aces_logo.jpg" alt="ACES Logo" width="500"/>
</p>

___
## ☀ Project Overview
The ACES Project Fund Management System is a web-based application designed to streamline and automate the process of managing fund requests within an organization. The system is built with a focus on user-friendliness, security, and scalability, and is designed to integrate seamlessly with existing accounting or financial systems. 🖥 

## 🗝 Key Features
- User Management: The system supports registration and login for Administrators, Fund Requesters, and Approvers, each with different access levels and functionalities.
- Fund Request Handling: Fund Requesters can submit requests specifying the purpose, amount, and any supporting documents. These requests can then be approved or rejected by Approvers through a single or multilevel approval process.
- Review and Tracking: All users can review requests, add comments, and track the status of requests. Automated notifications are sent for pending approvals, incomplete requests, and when requests are approved or rejected.
- Budget Management: The system ensures that requests align with the available budget and allows limits to be set per user or department.
- Document Management: Users can attach and manage supporting documents for each fund request.
Reporting: The system can generate detailed reports on fund utilization, pending requests, and historical data.
- Integration with Accounting Systems: Approved requests can be synced with accounting or financial systems, and budget balances can be updated accordingly.

## 🕸 Non-Functional Requirements
The system is designed to handle a large number of requests and users simultaneously without significant slowdowns (Performance). It stores and transmits user data, especially financial information, securely and controls access to different parts of the system based on user roles (Security). The system has a high uptime and can recover quickly from any failures (Reliability). It is user-friendly, with a clear and intuitive interface (Usability), and can scale to accommodate growth in the number of users or increase in data (Scalability).

## 🏢 Domain Requirements
The system complies with all relevant financial regulations and standards (Regulatory Compliance), provides a clear audit trail for all approvals and financial transactions (Auditability), ensures that requests align with available budgets (Budget Alignment), and can generate detailed reports on fund utilization, pending requests, and historical data (Reporting).

## 👩‍💻 Software Modelling

### Use Case Diagram

A Use Case Diagram is a type of behavioral diagram defined by and created from a Use-case analysis. Its purpose is to present a graphical overview of the functionality provided by a system in terms of actors, their goals (represented as use cases), and any dependencies between those use cases.
[Use Case Diagram](https://lucid.app/lucidchart/e5112998-f890-4847-aa55-93884899af6c/edit?viewport_loc=2249%2C5388%2C10934%2C4900%2C.Q4MUjXso07N&invitationId=inv_aef1d24a-24a8-4c66-a89b-afcd76e80282)

### Activity Diagram

An Activity Diagram shows the system's dynamic aspects by depicting the activities' workflow. For AFMS, the Activity Diagram will detail the sequence of actions involved in the fund request process, from submission by students to review and approval by authorities, and notification of outcomes. It highlights the flow of control from one activity to another and any decision points in the process.
[Activity Diagram](https://lucid.app/lucidchart/d9b854f9-3ec4-43f1-a16a-6a79f6e77aba/edit?viewport_loc=-386%2C-1149%2C3558%2C1445%2C0_0&invitationId=inv_c35cfa5e-5b9c-4678-9169-3dcdc3404ac7)

### Class Diagram

A class diagram is a type of static structure diagram in the Unified Modeling Language (UML) that describes the structure of a system by showing its classes, their attributes, operations (or methods), and the relationships among objects. It is a crucial part of object-oriented modeling and is used to visually represent and design the system architecture.[Class Diagram](https://lucid.app/lucidchart/437437e5-0ed2-4f7e-a883-8ccb2f5c5341/edit?invitationId=inv_5caf3fa6-7af0-437b-9a55-1245ce12efaf&page=0_0#) 

