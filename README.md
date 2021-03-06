# <img src="src/assets//hobbee_white.svg" height="75" alt="logo">


# Seba Team 01 Hobb.ee-web-application-frontend
[![build](https://github.com/Gozzim/hobbee-frontend/actions/workflows/build.yml/badge.svg)](https://github.com/Gozzim/hobbee-frontend/actions/workflows/build.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/gozzim/hobbee-frontend/badge)](https://www.codefactor.io/repository/github/gozzim/hobbee-frontend)


This repository contains the frontend for Hobb.ee.
The web application was built as part of the SEBA-Master course 2021 at TUM by team 01.

Hobb.ee is a social networking service that helps individuals meet new people with common interests by recommending activity-oriented groups based on their personal preferences.


Backend can be found [here](https://github.com/Gozzim/hobbee-backend)


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

To get started, you simply clone the [hobb.ee-frontend](https://github.com/Gozzim/hobbee-frontend) repository and install all of its dependencies:

### Prerequisites

You need git to clone the [hobb.ee-frontend](https://github.com/Gozzim/hobbee-frontend) repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test [hobb.ee-frontend](https://github.com/Gozzim/hobbee-frontend). You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Hobb.ee-Project-frontend

Navigate to a folder of your choice to create the file structure for the project. We recommend the following:
```
- /root-folder/
    - /root-folder/hobbee-frontend/
    - /root-folder/hobbee-backend/
    - /root-folder/database/
```

After creating the file structure, navigate to your root folder.

Clone the [hobb.ee-frontend](https://github.com/Gozzim/hobbee-frontend) repository using [git](http://git-scm.com/):

```bash
git clone https://github.com/Gozzim/hobbee-frontend.git
```

### Install Dependencies

Go to your frontend folder via command line
```bash
cd path/to/main-folder/hobbee-frontend
```

We get the necessary tools for our web application via `npm`, the [node package manager](https://www.npmjs.com).

```bash
npm install
```

### Create a Build for the Application


Run the command:

```bash
npm run build
```

-   `build` - contains all the files of your application and their dependencies.

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start this server is:

```bash
npm start
```

Now browse to the app at `http://localhost:3000`.

### Deploy the Application

```bash
serve -s build
```

Now browse to the app at `http://localhost:5000`.

Happy testing!

## License
This code and content is released under the [GNU AGPL license](https://github.com/Gozzim/hobbee-frontend/blob/master/LICENSE).

# <img src="src/assets//hobbee_white.svg" height="75" alt="logo">
