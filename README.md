# Electro App Frontend
This repository contains the source code for the frontend for an Electricity Distribution Management Dashboard

## Getting Started

The following steps will ensure you can set up the project on your local machine for development.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Installing

A. Clone the repository

```sh
git clone https://github.com/Adura-Hephzibah/electro_app_frontend.git
```

B. Enter Project Repo

```sh
cd electro_app_frontend
```

C. Install dependencies using npm or yarn

```sh
npm install
```
or
```sh
yarn
```

> **Please note if you want to use yarn, you will need to install it first. **


## Setting Up Environment Variables

For development, create a `.env` file in root of the repo with the following variables: 
```bash
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_ADMIN_SECRET=your_secret
```

Include `.env` file in your `.gitignore` file.



## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build` `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
