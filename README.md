## Time invested

Aprox 15-16 hours spend coding.

## Solution thinking

At context/bookManager.js you will find bookReducer function that contains the harder part of this code, I think can simplify some of this logic, because there is lot of duplicated code. That is why I focus unit test in that functionality, maybe thinking in a future refactor.

I never work before with drag and drop functionality, I thought this were going to be a hard part, but with a library help me a lot.

## Decisions before start coding

### TS vs Flow

TS is a more strucured way to type in JS in other hand Flow allow you a softer way to type your componets or functions.

### Redux(flux) vs Context vs Prop drilling

- Redux is a very good library to handle state management but also have an impact based in all base configurations(boilerplate), to small projects is not recomended even by themselves.
- Context is a API provided by React that provide us a simple way to manage states.
- Prop drilling is a very bad practice and make our code hard to follow

### Material-UI vs others

I like the default styles and the customization tools that provide Material-UI.

### formik vs Non-formik

Formik is a formidable library, that provide a set of tools that help us to create and manage forms in an easy way.

## Project structure

### components (src/components)

Here are all the React component used in this app, with his own distribution based on how are used.

#### common (components/common)

Here are components used in different screens or modals

#### modals (components/modals)

All custom modals used in this app.

#### screens (components/screens)

This contains the main screens used in this app. this use to have some subfolders with the components used in every screen.

### context (src/context)

There we can find some React contex used around the app, used with a particular design based in this (blog article)[https://kentcdodds.com/blog/how-to-use-react-context-effectively/]

### model (src/project)

As part of develop process is very important define some models that will help us to have the same object structure around the project

### icons (src/icons)

Some svg icons used as React components

### Libraries

This project use multiple libraries to manage local storage, to create unique identificator, to use styled components, to handle drag and drop, and all those that Create React app include for us.

### Local Storage manager

[Lockr](https://www.npmjs.com/package/lockr): That allow me a easy control of the local storage, specially allow me create objects inside of local storage(w/o cast to string).

### Unique identificator

[uniqid](https://www.npmjs.com/package/uniqid): that help me to create identificator based on multiple factors to avoid duplication.

### Styled components:

[@material-ui/core](https://www.npmjs.com/package/@material-ui/core): that provide a group of styled components.

### Static type checker

[flow-bin](https://www.npmjs.com/package/flow-bin): this library is helpful at the develop process to know the types of every variable, parameter or function return.

## Before start and after clone

To start working and using this app you will have to run

### `yarn install`

download all needed libraries

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
