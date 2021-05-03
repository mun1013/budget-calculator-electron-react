const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const ipc = electron.ipcMain;
const { Menu, dialog } = require('electron');
const { showNotification } = require('./notification');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680, 
    webPreferences: {
      contextIsolatiosn: true,
      nodeIntegration: true,
      webSecurity: false
      // preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.maximize();
  mainWindow.on('closed', () => mainWindow = null);

  if(isDev) {
    mainWindow.openDevTools();
    mainWindow.setIgnoreMouseEvents(false);
    console.log("======== DEV ==========");
    mainWindow.show();
    // send after did-finish-load
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('test','This is a test for development');
    })
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        // { role: 'toggleDevTools' },
        { label: 'Open File',
          click: () => {
            const options = {
              title: "Open File",
              defaultPath: "BudgetReport.txt",
              buttonLabel: "Open",
              filters : [
                {name: 'Text Document', extensions:['txt']}
              ],
              properties: ['openFile']
            };
            dialog.showOpenDialog(options).then((res) => {
              if (res.canceled) {
                console.log('Operation canceled.');
              } else {
                fs.readFile(res.filePaths[0], 'utf8', function read(err, data) {
                  console.log('data',data)
                  mainWindow.webContents.send('read', data);
                })
              }
            });
          }
        },
        { role: 'quit' }
      ]
    },
    {
      label: 'Export',
      submenu: [
        {
          label: 'Text File',
          click: () => {
            const options = {
              title: "Save As Text Document",
              defaultPath: "BudgetReport.txt",
              buttonLabel: "Save Text File",
              filters : [
                {name: 'Text Document', extensions:['txt']}
              ]
            };
            dialog.showSaveDialog(options).then((res) => {
              mainWindow.webContents.send('textFile', res.filePath);
            });
          }
        },
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'User guides',
          click: () => {
            const option = {
              type: 'info',
              button: 'Ok',
              title: 'User guides',
              message: 'Fill up the item and value and select the type of budget (i.e income or expenses), hit the add button and track your budget.\nSelect Year and Month before exporting to the text file.',
            }
            dialog.showMessageBox(null, option);
          }
        },
        {
          label: 'About',
          click: () => {
            const option = {
              type: 'info',
              button: 'Ok',
              title: 'Budget Calculator',
              message: 'Version 1.1.1\nElectron: 11.0.3',
            }
            dialog.showMessageBox(null, option);
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

ipc.on('exported', (event, data) => {
  showNotification('Export Text File', "Successfully Exported.");
});

ipc.on('read-it', (event, data) => {
  showNotification('Read Text File', "Successfully read.");
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});