import chalk from 'chalk';
import fs from 'fs-extra';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import rif from 'replace-in-file';

import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';


const access = promisify(fs.access);
const replace = promisify(rif);

async function copyTemplateFiles(options) {
  
  fs.copy(options.templateDirectory, options.targetDirectory, err => {
    if (err) return Promise.reject(new Error('Failed to copy files'));
  })
  
}

async function renameTemplateFiles(options){

  const result = await execa(
    'mv', [ 
      options.targetDirectory+'/_M_CC_NAME.php', 
      options.targetDirectory+'/'+camelCase(options.moduleName)+'.php'
    ])

  if(result.fails) {
    return Promise.reject(new Error('Failed to rename template files'));
  }

}

//  Replace names
async function renderTemplateFiles(options) {
    return replace( 
      {
        files: options.targetDirectory +'/*', 
        from: [
          /_M_NAME/g, 
          /_M_CC_NAME/g,
          /_M_KC_NAME/g,
          /_NAMESPACE/g,
          /_A_NAME/g,
          /_A_EMAIL/g,
          /_A_ORG/g,
        ], 
        to: [
          options.moduleName, 
          camelCase(options.moduleName),
          kebabCase(options.moduleName),
          options.namespace, 
          options.author,
          options.email,
          options.org
        ] 
      });
}

// Remove features and/or comments if not wanted
async function handleFeatureJavascript(options) {

  if(options.featureJavascript) {
    return replace(
      {
        files: options.targetDirectory +'/*', 
        from: [/#feature js/g, /#end feature js/g], 
        to: ''
    });
  }
  else {
    return replace(
      {
        files: options.targetDirectory +'/*', 
        from: /#feature js([\S\s]*?)#end feature js/g, 
        to: ''
    });    
  }
}

async function handleFeatureCSS(options) {

  if(options.featureCSS) {
    return replace(
      {
        files: options.targetDirectory +'/*', 
        from: [/#feature css/g, /#end feature css/g], 
        to: ''
    });    
  } else {
    return replace(
      {
        files: options.targetDirectory +'/*', 
        from: /#feature css([\S\s]*?)#end feature css/g, 
        to: ''
    });  

  }
}

async function handleFeatureUnitTest(options) {
  if(options.featureUnitTest) {
    return replace(
      {
        files: options.targetDirectory +'/*', 
        from: [/#feature unit test/g, /#end feature unit test/g], 
        to: ''
    });    
  } else {
    return replace( 
      {
        files: options.targetDirectory +'/*', 
        from: /#feature unit test([\S\s]*?)#end feature unit test/g, 
        to: '' 
      });
  }
}


//  Initialize Git
async function initGit(options) {
 const result = await execa('git', ['init'], {
   cwd: options.targetDirectory,
 });
 if (result.failed) {
   return Promise.reject(new Error('Failed to initialize git'));
 }
 return;
}

export async function createRedcapModule(options) {
 options = {
   ...options,   
   directoryName: '/' + snakeCase(options.moduleName) + '_v1.0.0',
   targetDirectory: options.targetDirectory || process.cwd() + '/' + snakeCase(options.moduleName) + '_v1.0.0'
 };

 // Fix path for Windows
 const currentFileUrl = import.meta.url;
 const templateDir = path.resolve(
    new URL(currentFileUrl).pathname.substring(new URL(currentFileUrl).pathname.indexOf('/')+1),
    '../../templates',
    options.template.toLowerCase()
  );
 options.templateDirectory = templateDir;

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
   console.error('%s Invalid template name', chalk.red.bold('ERROR'));
   process.exit(1);
 }

  const tasks = new Listr([
   {
     title: 'Copy template files',
     task: () => copyTemplateFiles(options),
   },
   {
    title: 'Rename template files',
    task: () => renameTemplateFiles(options),
   },
   {
    title: 'Render template files',
    task: () => renderTemplateFiles(options),
   },
   {
    title: 'template feature: Javascript',
    task: (ctx, task) => {
      task.title = (options.featureJavascript ? "Add " : "Remove ") + task.title;
      handleFeatureJavascript(options);
    }  
   },
   {
    title: 'template feature: CSS',
    task: (ctx, task) =>  {
      task.title = (options.featureCSS ? "Add " : "Remove ") + task.title;
      handleFeatureCSS(options);
    }  
   },   
   {
    title: 'template feature: Unit Testing',
    task: (ctx ,task) => {
      task.title = (options.featureUnitTest ? "Add " : "Remove ") + task.title;
      handleFeatureUnitTest(options)
    }
   },
   {
     title: 'Initialize git',
     task: () => initGit(options),
     enabled: () => options.git,
   }
 ]);

 await tasks.run();
 console.log('%s Your new Redcap Module is ready.', chalk.green.bold('DONE'));
 return true;
}
