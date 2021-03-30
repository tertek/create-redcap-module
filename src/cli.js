import arg from 'arg';
import inquirer from 'inquirer';
import { createRedcapModule } from './main';

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--git': Boolean,
     '--yes': Boolean,
     '--install': Boolean,
     '-g': '--git',
     '-y': '--yes',
     '-i': '--install',
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   skipPrompts: args['--yes'] || false,
   git: args['--git'] || false,
   template: args._[0],
   runInstall: args['--install'] || false,
 };
}

async function promptForMissingOptions(options) {

 const defaultTemplate = 'Default';
 const defaultModuleName = 'My Awesome Module';
 const defaultNamespace = 'XYZA';
 const defaultAuthor = 'Firstname Lastname';
 const defaultEmail = 'your@email.org';
 const defaultOrg = 'Organisation Name';
 const defaultFeatures = ['Include Javascript','Include CSS'];

 if (options.skipPrompts) {
   return {
     ...options,
     moduleName: options.moduleName || defaultModuleName,     
     namespace: options.namespace || defaultNamespace,
     template: options.template || defaultTemplate,
     features: options.features || defaultFeatures,
     author: options.author || defaultAuthor,
     email: options.email || defaultEmail,
     org: options.org || defaultOrg
   };
 }
 
 const questions = [];
 if (!options.moduleName) {
   questions.push({
     type: 'input',
     name: 'moduleName',
     message: 'Define Module Name',
     default: defaultModuleName
   });
 }

   questions.push({
      type: 'input',
      name: 'namespace',
      message: 'Define Namespace',
      default: defaultNamespace
   });

   questions.push({
    type: 'list',
    name: 'template',
    message: 'Please choose which project template to use',
    choices: ['Default'],
    default: defaultTemplate,
  });

  questions.push({
    type: 'checkbox',
    name: 'features',
    message: 'Please choose which features to use',
    choices: [
      'Include Javascript',
      'Include CSS',
      'Include Unit Testing'
    ],
    default: defaultFeatures
  });

   questions.push({
    type: 'input',
    name: 'author',
    message: 'Author Name',
    default: defaultAuthor
   });

   questions.push({
    type: 'input',
    name: 'email',
    message: 'Author Email',
    default: defaultEmail
   });

   questions.push({
    type: 'input',
    name: 'org',
    message: 'Author Organisation',
    default: defaultOrg
   });

 if (!options.git) {
   questions.push({
     type: 'confirm',
     name: 'git',
     message: 'Initialize a git repository?',
     default: false,
   });
 }

 const answers = await inquirer.prompt(questions);
 return {
   ...options,
   template: options.template ||  answers.template,
   moduleName: answers.moduleName,
   namespace: answers.namespace,
   author: answers.author,
   email: answers.email,  
   org: answers.org,
   features: answers.features,
   featureJavascript: answers.features.includes("Include Javascript"),
   featureCSS: answers.features.includes("Include CSS"),
   featureUnitTest: answers.features.includes("Include Unit Testing"),
   git: options.git || answers.git,
 };
}

export async function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 options = await promptForMissingOptions(options);
 await createRedcapModule(options);
}