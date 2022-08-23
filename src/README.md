# Dario Dumlijan - Web Portfolio

### Requirements

#### Node.js & yarn

Node version `16.10.0` and up needed to run the React scripts. And yarn to run the scripts and handle dependencies.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Development

Install node dependencies:

    yarn (install)

Run dev server for development in the browser:

    yarn start

To build application for production:

    yarn build

Run test handled by [testing-library](https://testing-library.com/):

    yarn test

To create a sitemap:

    yarn sitemap

To deploy the app with firebase (*firebase-cli needed):

    yarn deploy

### Environment Variables

Add `.env` file to root directory. Variables must start with a prefix `REACT_APP_`. Variable named `REACT_APP_API_URL` is then accessed in the code with

    process.env.REACT_APP_API_URL

Node variables are populated only during initial dev server load, so restart server when adding or updating variables.

#### A list of all used variables
    ESLINT_NO_DEV_ERRORS="true"
    REACT_APP_PROJECT_NAME="Dario Dumlijan"
    REACT_APP_STAGING_USERNAME="<secret>"
    REACT_APP_STAGING_PASSWORD="<secret>"
    REACT_APP_CMS_AUTHORIZATION="<secret>"
    REACT_APP_CMS_SPACE_ID="<secret>"
    REACT_APP_CMS_GRAPHQL_URL="<secret>"
    REACT_APP_EMAIL_TO_ADDRESS="<secret>"
    REACT_APP_EMAIL_ENDPOINT="<secret>"
    REACT_APP_EMAIL_API_KEY="<secret>"
    REACT_APP_RECAPTCHA_PRODUCTION="<secret>"
    REACT_APP_RECAPTCHA_TEST="<secret>"

#### Other env variables

During development, you can avoid your webpack build failing because of `eslint` errors by adding env variable:

    ESLINT_NO_DEV_ERRORS="true"