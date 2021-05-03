# electron-react budget calculator app

This is a simple budget calculator app developed by electron-react. It supports exporting and importing your budget report in text format.

## Electron

Electron is a framework that allows you to create desktop application with Javascript. I keen to highlight the IPC communication and its process type by the Electron, which is known as ipcMain and ipcRenderer. Electron.js is the main script that running the main process and display the GUI, on the other hand, the renderer process communicate with the main process to perform operation on the GUI. 

Sending message from the main process to the renderer process,

```
const BrowserWindow = electron.BrowserWindow;

mainWindow = new BrowserWindow({ width: 800, height: 600 })
mainWindow.webContents.send('textFile', res.filePath);
```

Renderer process listens to the channel,

```
const { ipcRenderer } = require('electron');

ipcRenderer.on('textFile', (event, data) => { 
  console.log(data);
});

```
## Installation 

1. Make sure to install [node](https://nodejs.org/en/).

2. Navigate to the project directory and install the node modules

```bash
npm install
```

## Development

Run the electron app in development mode.

```bash
# the electron app will run on port 3000
npm run electron-dev
```

## Usage
Fill up the form and select the type of budget - income or expense from the dropdown and hit the add button. Total income, expenses and balance will be updated upon clicking the add button.

On the menu bar, click Export -> Text File to generate the text report, and Menu -> Open File to import the text report.

## Production

How to package the electron app? electron-builder is one of the available package to build a ready for distribution electron app. Refer to the [website] [https://www.electron.build/configuration/nsis] for the configuration. 

```bash
npm install -g electron-builder
```

You need to install this package globally in order to run the command successfully.

```bash
npm run build
```

Run the above command to build the app before packaging the electron app.

```bash
npm run electron-build
```

Then, run the above command and you will get the packaged or unpackaged version of the electron app in the dist folder.

The .exe and the setup is located in the ./dist folder and run **budget-calculator-electron.exe** (The exe is a little too large to upload here). Please be noted that this exe is only applicable for devices running in Window x64. But you also can build the electron app in any platform target.



