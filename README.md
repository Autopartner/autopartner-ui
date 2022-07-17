# Autopartner UI
Based on https://themeforest.net/item/vuero-vuejs-3-admin-and-webapp-ui-kit/31053035

## ▶️ Getting started

### Prerequisites

1. A recent web browser (Chrome, Edge, Firefox, ...)
2. [Nodejs LTS](https://nodejs.org/en/) _(> 14.x with npm >7)_ installed
3. Knowledge with [Typescript](https://github.com/microsoft/typescript) _(> 4.x)_ (should not be installed globally)
4. (recommended) [VSCode](https://code.visualstudio.com/ with [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

#### Install nodejs

First, check if you already have node and npm installed. To check if you have Node.js installed, run this command in your terminal:

```bash
node -v
```

To confirm that you have npm installed you can run this command in your terminal:

```bash
npm -v
```

If node is not installed on your machine, you can go to the official nodejs.org website, and choose the version depending on your operating system:

- <a href="https://nodejs.org/en/download/" target="_blank">Install node.js and npm on Windows, Linux or Mac OSX</a>

#### Check the npm version

npm is a separate project from Node.js, and tends to update more frequently. As a result, even if you’ve just downloaded Node.js (and therefore npm), you’ll probably need to update your npm. Luckily, npm knows how to update itself! To update your npm, type this into your terminal:

```bash
npm install --global npm@latest
```

#### Installing Yarn (recommended)

We personally recommend Yarn as we think it is a better package manager than npm. If you want to use Yarn, keep in mind that you should not mix the 2. You either use Yarn or Npm in a project, never both.

```bash
npm install --global yarn
```

## 📦 Dependencies installation

To setup the template and start installing project dependencies, run one of the following commands:

```bash
# using npm v7
npm install --legacy-peer-deps

# using yarn
yarn install
```

## 🔃 Run a development server

To start the development server, run one of the following commands:

```bash
# using npm v7
npm run dev

# using yarn
yarn dev
```

This will run the `dev` script from the `package.json` file.
You will notice that two servers are started: one for the frontend (vite) and one for the backend (json-server).

Vite is the build tool that we use to compile the frontend code.
It replace webpack and vue-cli, used in vue 2 ecosystem.
You can only start vite with `dev:vite`  
Read more about it [on vitejs.dev](https://vitejs.dev/)

Json-server is a fake REST-API server that we use to simulate the backend.
The configuration and the database are in the `/json-server` directory.
You can find how we use it in the `/src/pages/messaging-v1.vue` file and the `/src/composable/useChatApi.ts`  
You can only start vite with `dev:json-server`  
Read more about it [on github.com/typicode/json-server](https://github.com/typicode/json-server)

> - Access the frontend in your browser at [http://localhost:3000/](http://localhost:3000/)
> - Access the Json-server backend in your browser at [http://localhost:8080/](http://localhost:8080/)
