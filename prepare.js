const inquirer = require('inquirer');
const { execSync } = require('child_process');

// Set your app versions here.
var versions = [{
    name: 'Your Paid App',
    value: {
      name: 'Your Paid App',
      id: 'app.paid.your',
    }
},
{
  name: 'Your Free App',
  value: {
    name: 'Your Free App',
    id: 'app.free.your',
  }
}]

clearScreen()

inquirer.prompt([{
  type: 'list',
  name: 'version',
  message: 'Pick a version',
  choices: versions
}, {
  type: 'checkbox',
  name: 'commands',
  pageSize: 40,
  message: 'Select commands to run',
  choices: [{
    name: '📥 Git Pull',
    value: 'git_pull',
    checked: true
  },
  {
    name: '📦 Install Packages',
    value: 'install_packages',
    checked: true,
  },
  {
    name: '📦 Update Packages',
    value: 'update_packages',
    checked: true,
  },
  new inquirer.Separator('Platform Removal'),
  {
    name: '🧹 Remove Android',
    value: 'remove_android'
  }, {
    name: '🧹 Remove iOS',
    value: 'remove_ios'
  }, {
    name: '🧹 Remove Electron',
    value: 'remove_electron'
  },
  new inquirer.Separator('Platform Addition'),
  {
    name: '🔌 Initialize Capacitor',
    value: 'cap_init'
  },
  {
    name: '📦 Install Pods (iOS)',
    value: 'install_pods'
  },
  {
    name: '➕ Add Android',
    value: 'add_android'
  }, {
    name: '➕ Add iOS',
    value: 'add_ios'
  }, {
    name: '➕ Add Electron',
    value: 'add_electron'
  },
  new inquirer.Separator('Code Building'),
  {
    name: '🔧 Build App',
    value: 'build_app',
    checked: true
  }, {
    name: '🔄 Copy files in ./etc to platforms',
    value: 'copy_etc',
    checked: true
  }, {
    name: '🔄 Sync Capacitor (update & copy)',
    value: 'cap_sync',
    checked: true
  },
new inquirer.Separator('IDE Launching'),
{
  name: '📱 Launch Android Studio',
  value: 'open_android',
  checked: true
},
{
  name: '📱 Launch Xcode',
  value: 'open_ios',
},
{
  name: '📱 Launch Electron IDE',
  value: 'open_electron',
}
]
}]).then((answers) => {
  runActions(answers)
})

// Functions

function addPlatform(platform = null) {
  if(platform == null) {
    addPlatform('ios')
    addPlatform('android')
    addPlatform('electron')
  } else if(platform == 'ios') {
    execCommand('npx cap add ios', '➕ Adding iOS..')
  } else if(platform == 'android') {
    execCommand('npx cap add android', '➕ Adding Android..')
  } else if(platform == 'electron') {
    execCommand('npx cap add electron', '➕ Adding Electron..')
  }
}

// Build the app
function buildApp() {
  execCommand('npm run build', '🔧 Building the app..')
}

// Updates dependencies and syncs the build dir.
function capSync() {
  execCommand('npx cap sync', '➕ Syncing Code..')
}

// Clears the console
function clearScreen() {
  const readline = require('readline')
  const blank = '\n'.repeat(process.stdout.rows)
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

function copyEtcFiles(package) {
  execCommand('cp -R ./etc/' + package + '/. ./', '🔄 Copying files from ./etc/' + package + '..', false)
}

// Run a command and log a message to the screen.
function execCommand(command, message, sync = true) {
  console.log(message)
  if(sync) {
    execSync(command)
  } else {
    exec(command)
  }
}

function gitPull() {
  execCommand('git pull', '📥 Pulling code..')
}

function initCapacitor(name, package) {
  execCommand('npx cap init --web-dir=dist "' + name + '" "' + package + '"', '🔌 Initializing Capacitor..')
}

function installPods() {
  execCommand('pod install --project-directory="./ios/App"', '🔧 Installing Pods..')
}

function openPlatform(platform, launch = false) {
  if(launch == true) {
    switch(platform) {
      case 'android':
        // Insert command here to launch on device
      break;
      case 'ios':
        // Insert command here to launch on device
      break;
      case 'electron':
        // Insert command here to launch on device
      break;
    }
  } else {
    execCommand('npx cap open ' + platform, '📱 Opening ' + platform + ' in IDE..')
  }
}

// Gets rid of an existing platform. If none is specified, all are removed
function removePlatform(platform = null) {
  if(platform == null) {
    removePlatform('ios')
    removePlatform('android')
    removePlatform('electron')
  } else if(platform == 'ios') {
    execCommand('rm -rf ios', '🧹 Removing existing iOS folder..')
  } else if(platform == 'android') {
    execCommand('rm -rf android', '🧹 Removing existing Android folder..')
  } else if(platform == 'electron') {
    execCommand('rm -rf electron', '🧹 Removing existing Electron folder..')
  }
}

// This takes a set of answers from inquirer and runs the commands (in the order presented here)
function runActions(actions) {
  actions.commands.forEach(function(action) {
    switch(action) {
      case 'git_pull':
        gitPull()
      break;
      case 'update_packages':
        updatePackages(false, true)
      break;
      case 'install_packages':
        updatePackages(true, false)
      break;
      case 'build_app':
        buildApp()
      break;
      case 'remove_android':
        removePlatform('android')
      break;
      case 'remove_ios':
        removePlatform('ios')
      break;
      case 'remove_electron':
        removePlatform('electron')
      break;
      case 'cap_init':
        initCapacitor(answers.version.id, answers.version.name)
      break;
      case 'add_android':
        addPlatform('android')
      break;
      case 'add_ios':
        addPlatform('ios')
      break;
      case 'add_electron':
        addPlatform('electron')
      break;
      case 'copy_etc':
        copyEtcFiles(answers.version.id)
      break;
      case 'cap_sync':
        capSync()
      break;
      case 'install_pods':
        installPods()
      break;
      case 'open_android':
        openPlatform('android')
      break;
      case 'open_ios':
        openPlatform('ios')
      break;
      case 'open_electron':
        openPlatform('electron')
      break;
      case 'open_android_launch':
        openPlatform('android', true)
      break;
      case 'open_ios_launch':
        openPlatform('ios', true)
      break;
      case 'open_electron_launch':
        openPlatform('electron', true)
      break;
    }
  })
}

function updatePackages(install = true, update = true) {
  if(install == true) {
    execCommand('npm install', '📦 Installing packages..')
  }

  if(update == true) {
    execCommand('npm update', '📦 Updating packages..')
  }
}
