# ionic-vue-prepare
This script provides an interactive way to manage multiple versions of a Ionic Vue / Capacitor app.

## Installation
This script requires node.js.

To use this script:

1. Install Node.js
2. Add this file to the root of your Ionic Vue project
3. Edit the file and change the `versions` variable at the top to match your project settings
3. Create a folder structure that looks like this:
```
   root
     etc
       your.package.id.1
         ios
         android
         electron
       your.package.id.2
         ios
         android
         electron
```
(when you run `Copy files in ./etc to platforms`, it'll copy the contents of ./etc/<package id> to the root of your folder. Use this to copy things like app icons, Firebase credentials etc.)

4. Run `npm install --save inquirer`
5. Run `node prepare.js`
6. Follow the on-screen prompts.

## The purpose of this script
I didn't want to check a billion iOS and Android project files into git, so I added those folders to my `.gitignore`. I also didn't want to have to re-copy files like icons and splash screens manually every time I worked on my project on a different machine, so I put this script together.

This also helps me out immensely when building two separate versions of my app (paid and ad-supported) so it's a great time saver.
