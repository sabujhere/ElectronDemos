const electron = require('electron');

const {app, BrowserWindow, Menu} = electron;
let maninWindow;
let addWindow;

app.on('ready',() =>{
    maninWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    maninWindow.loadURL(`file://${__dirname}/main.html`);
    maninWindow.on('closed', ()=>{app.quit()});
    
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
 addWindow = new BrowserWindow({
     width:300,
     height:200,
     title:'Add new Todo'

 })
 addWindow.loadURL(`file://${__dirname}/add.html`);
 addWindow.setMenu(null);
}

const menuTemplate = [
    {
        label:'MyFile',
        submenu:[
            {
                label:'New Todo',
                click() {
                    createAddWindow();
                }
            },
            {
                label:'Quit',
                accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if(process.platform === 'darwin') {
    menuTemplate.unshift({});
}