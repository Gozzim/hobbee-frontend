# <img src="https://hobb.ee/static/media/hobbee_white.7e5bc008.svg" height="75" alt="logo">


# Seba Team 01 Hobb.ee-web-application-frontend

This repository contains the frontend for Hobb.ee.
The web application was built as part of the SEBA-Master course 2021 at TUM by team 01.

Hobb.ee is a social networking service that helps individuals meet new people with common interests by recommending activity-oriented groups based on their personal preferences.


Backend can be found [here](https://gitlab.lrz.de/seba-master-2021/team-01/backend/)


Follow this readme to build and run the hobb.ee frontend locally.





## Prerequisites

Both for the frontend and the backend:

* nodejs
    * [official website](https://nodejs.org/en/)
    * version 16.3
* npm js
    * [offical website](https://www.npmjs.com/) (node package manager)
    * version 7.16.0

Only for backend:
* mongodb
    * [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)
    * v4.4.6


We tested on these versions. You can try to run the project on newer versions, but we do not guarantuee for compatability.



## Getting Started

To get started, you simply clone the [hobb.ee-frontend](https://gitlab.lrz.de/seba-master-2021/team-01/frontend/) repository and install all of its dependencies:

### Prerequisites

You need git to clone the [hobb.ee-frontend](https://gitlab.lrz.de/seba-master-2021/team-01/frontend/) repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test [hobb.ee-frontend](https://gitlab.lrz.de/seba-master-2021/team-01/frontend/). You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Hobb.ee-Project-frontend

Navigate to a folder of your choice to create the file structure for the project. We recommend the following:
```
- /root-folder/
    - /root-folder/frontend/
    - /root-folder/backend/
    - /root-folder/database/
```

After creating the file structure, navigate to your root folder.

Clone the [hobb.ee-frontend](https://gitlab.lrz.de/seba-master-2021/team-01/frontend/) repository using [git](http://git-scm.com/):

```
git clone https://gitlab.lrz.de/seba-master-2021/team-01/frontend.git
```

### Install Dependencies

Go to your frontend folder via command line
```
cd path/to/main-folder/frontend
```

We get the necessary tools for our web application via `npm`, the [node package manager](https://www.npmjs.com).

```
npm install
```

### Create a Build for the Application


Run the command:

```
npm run build
```

-   `build` - contains all the files of your application and their dependencies.

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:3000`.

## Testing Premium - Using Paypal sandbox for  hobb.ee


For our Paypal Integration we are using the Paypal Sandbox.
If you want to test this integration you can follow the "Buy Premium" steps after you logged in and enter the following Paypal Customer Credentials:

```
CustomerAccount:
   Login: sb-4347ask6835997@personal.example.com
   Pass: 8emswG&w
```


Happy testing!

# <img src="https://hobb.ee/static/media/hobbee_white.7e5bc008.svg" height="75" alt="logo">
