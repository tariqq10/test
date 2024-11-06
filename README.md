# Online Charity Management
The local charity Organizations are among the most adversely affected groups by the Covid 19 Pandemic. Majority of the donors are losing their ability to support these organizations because of the economic impact left behind by the pandemic. Furthermore, finding new donors is also an enormous challenge, leaving the thousands of beneficiaries impoverished. Charity is an act of kindness where someone donates what they have to the less fortunate.


## Problem Statement
The drop of donors and well-wishers has left many of the charity organizations in a very dire state, with some even on the verge of closure because of lack of basic needs. These organizations directly support a huge number of beneficiaries positively impacting their lives. 

Your task is to create an online charity management system that will help these charity organizations get funding and donors easily. The project should implement all the best practices. It will have three modules: Admin, NGOs and Donors. Only an admin can approve the request made by the NGOs. NGOs can register and request donations on what they need by submitting a form capturing all the details. They should also be able to view previous and donation reports. 
Donors can register and login using their credentials and will see a list of requests for donations on the home page. They should be able to filter by category and also view single details of donation requests. They should also be able to donate whatever they have and a report on donation history


### Minimum Viable Product
The first version of work that is expected must meet the following metrics:
* Allow for user authentication
* Classify users on whether they are Admin, NGOs or Donors.
* Give the right to add, update, or remove data only to the right people based on their classification.
* Admins can create the different categories of donations.
* Only Admins can approve an NGO’s donation request.
* Admins can view all the donation requests.
* NGOs can create a request for donation stating a reason and under which category.
* NGOs Can view their previous requests and donations.
* Donors can view all the approved donation requests
* Donors can view a list of their donations in the profiles.
* Donors can be able to donate the amount they have.
* Donors should be able to filter by category.
* All data must be stored in a central location


### Technical Objectives
* All commits must be descriptive
Before a commit is accepted, it must be reviewed by 2 members and the project lead
* Each feature must have its own branch
* All feature branches are to be deleted once the pull request is accepted.
* The project must have unit tests, UI tests, and must maintain a  test coverage of above 85% for both UI and Unit tests.
* The code should be in a modular format such that if one module of the project fails it does not affect other modules that are not related to it.

### Technologies
Backend: Flask
Database: PostgreSQL
Wireframes: Figma (Should be mobile friendly)
Testing Framework: ​Jest & Minitests
Frontend: ReactJs & Redux Toolkit(state management)
