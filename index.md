## Documentation

You can use the "create-redcap-module" CLI tool to easily bootstrap new REDCap modules. The following documentation will help you to setup your system and use the tool. If you are new to CLI & Node.js it may also be helpful to check out the links within the further reading sections.

### System Requirements

#### Install Node.js and NPM

Node.js is a requirement for the npm package to be called from your terminal via `npx`. To install Node.js on your operating system go to their official website. 

[Get Node.js here](https://nodejs.org/en/)

After installing Node.js and NPM you should check if you have the correct versions installed and if their commands have been added to your System Environment. To do this open your CLI and run:

```bash
$ npm -v && node -v
```

The output should be something like:
```bash
6.14.8
v14.15.1
```

If you are not getting the version numbers returned than you may have to add npm to your *Path Variable*.

*Further Reading*

[Fixing NPM path in Windows](https://stackoverflow.com/a/27864253/3127170)<br>
[What is CLI?](https://www.w3schools.com/whatis/whatis_cli.asp)<br>
[What is npm?](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/)<br>
[What is npx?](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)<br>
[Configure npm to work behind a proxy](https://stackoverflow.com/a/10304317/3127170)<br>

#### Setup REDCap environment

It is recommened to use a local development environment while creating new modules for REDCap. Ensure you are running a stable version of REDCap with a successful configuration of all dependencies, such as database connection and file access permissions. 


*Further Reading*

[REDCap Software requirements](https://projectredcap.org/software/requirements/)<br>
[Official REDCap Download](https://community.projectredcap.org/page/download.html)<br>
[Laragon - Universal development environment](https://github.com/leokhoa/laragon)<br>


### How to use `create-redcap-module`?
To use `create-redcap-module`  you do not need to install anything else then provided in the **System Requirements**. If you are ready to go open up your CLI and proceed as follows.

Step 1: Navigate to your REDCap module folder
Depending on where your REDCap version is running you have change directory to the according path:

```bash
$ cd <my-redcap-directory>/modules/
```

Step 2: Within your REDCap modules folder call `create-redcap-module` with npx
Type the following command and you will be lead through the generator steps:

```bash
$ npx create-redcap-module
```

After Step 2 completes the script is finished and there should be a new folder within your modules directory with the name that you have chosen for your new module.
Enjoy your module development!

### Support
If you have any problems or issues please use the [Github Issues](https://github.com/tertek/create-redcap-module/issues).
