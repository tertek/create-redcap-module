import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import Twig from 'twig';
import os from 'os';
import commandExists from 'command-exists';
import xml2js  from 'xml2js';


const access = promisify(fs.access);

//  Renders base template files
async function renderTemplateBase(options) {

  //to do: add try catch block
  await fs.mkdir(options.targetDirectory);

  await Twig.renderFile(options.templateDirectory+'/class.twig', {options:options}, (err, data) => {
    if(err) return Promise.reject(new Error(err));
    fs.writeFile(options.targetDirectory + '/' + options.moduleNameCC + '.php', data)
  });

  await Twig.renderFile(options.templateDirectory+'/config.twig', {options:options}, (err, data) => {
    if(err) return Promise.reject(new Error(err));
    fs.writeFile(options.targetDirectory + '/config.json', data)
  });

  await Twig.renderFile(options.templateDirectory+'/LICENSE.twig', {author:options.author}, (err, data) => {
    if(err) return Promise.reject(new Error(err));
    fs.writeFile(options.targetDirectory + '/LICENSE', data)
  });

  await Twig.renderFile(options.templateDirectory+'/README.twig', {moduleName:options.moduleName, moduleNameSC: options.moduleNameSC, hasTest: options.featureUnitTest}, (err, data) => {
    if(err) return Promise.reject(new Error(err));
    fs.writeFile(options.targetDirectory + '/README.md', data)
  });

  return;

}

//  Renders additional template files for features
async function renderTemplateFeatures(options) {

    //  Javascript
    if(options.featureJavascript) {
      await fs.mkdir(options.targetDirectory + '/js');

      await Twig.renderFile(
        options.templateDirectory+'/js/main.twig', 
        { options:options }, 
        ( err, data ) => {
          if(err) return Promise.reject(new Error(err));
          fs.writeFile(options.targetDirectory + '/js/main.js', data)
      });
    }

    //  CSS
    if(options.featureCSS) {
      await Twig.renderFile(
        options.templateDirectory+'/style.twig', 
        { moduleNameKC:options.moduleNameKC }, 
        ( err, data ) => {
          if(err) return Promise.reject(new Error( err ));
          fs.writeFile(options.targetDirectory + '/style.css', data)
      });
    }

    //  Language
    if(options.featureLang) {
      await fs.mkdir(options.targetDirectory + '/lang');
      await fs.copyFile(options.templateDirectory + '/lang/English.ini', options.targetDirectory + '/lang/English.ini');
    }  

    //  Tests
    if(options.featureUnitTest) {
      await fs.mkdir(options.targetDirectory + '/tests');
      await Twig.renderFile(
        options.templateDirectory+'/tests/BaseTest.twig', 
        { options:options }, 
        ( err, data ) => {
          if(err) return Promise.reject(new Error( err ));
          fs.writeFile(options.targetDirectory + '/tests/BaseTest.php', data)
      });
      await Twig.renderFile(
        options.templateDirectory+'/tests/test.twig', 
        { options:options }, 
        ( err, data ) => {
          if(err) return Promise.reject(new Error( err ));
          fs.writeFile(options.targetDirectory + '/tests/' + options.moduleNameCC + 'Test.php', data)
      });      
    }
}


async function installUnitTest(options) {
  try {
    await execa('composer', ['require', '--dev', 'phpunit/phpunit'], {
      cwd: options.targetDirectory,
    })
  } catch(err) {
    throw new Error('An error occured during PHPUnit Install.', err);
  }
}

async function installDevTool(options) {
  try {
    await execa('composer', ['require', '--dev', 'symfony/var-dumper'], {
      cwd: options.targetDirectory,
    })
  } catch(err) {
    throw new Error('An error occured during symfony/var-dumper Install.', err);
  }
}

//  Initialize Composer 
async function initComposer(options) {
  return new Listr([
    {
      title: 'Install PhpUnit',
      task: () => installUnitTest(options),
      enabled: () => options.featureUnitTest      
    },
    {
      title: 'Install Dev Tooling',
      task: () => installDevTool(options),
      enabled: () => options.featureDevTool      
    }    
  ]);
  }

//  Initialize Git
async function initGit(options) {
 const result = await execa('git', ['init'], {
   cwd: options.targetDirectory,
 });
 if (result.failed) {
   return Promise.reject(new Error('Failed to initialize git'));
 }
 await fs.copyFile(options.templateDirectory + '/.gitignore', options.targetDirectory + '/.gitignore');

 return;
}

export async function createRedcapModule(options) {

 options = {
   ...options,   
   directoryName: '/' + options.moduleNameSC + '_v1.0.0',
   targetDirectory: options.targetDirectory || path.join(process.cwd(), options.moduleNameSC + '_v1.0.0')
 };

if(options.composer) {
  //  Composer installed?
  try {
    await commandExists("composer");
  } catch(err) {
    throw new Error('A command `composer` does not exist. Please ensure you have installed Composer (https://getcomposer.org/).', err);
  }
}

//  Prepare path
const fullPathName = new URL(import.meta.url).pathname;
let templateDir;
templateDir = path.resolve(
    fullPathName, 
    '../../templates', 
    options.template.toLowerCase()
  );

 // Fix path building for Windows
 if(os.platform() == 'win32') {
  templateDir = templateDir.replace(/^(\w:\\)(\w:\\)/, '$2');
 }
 options.templateDirectory = templateDir;

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
  throw new Error('Cannot access to dir.', err);
 }

 const tasks = new Listr([
    {
      title: 'Render Template Base',
      task: () => renderTemplateBase(options)
    },
    {
    title:  'Render Template Features',
    task: () => renderTemplateFeatures(options)
    },   
    {
      title: 'Install Composer dependencies',
      task: () => initComposer(options),
      enabled: () => options.composer,
    },
    {
    title: 'Initialize git',
    task: () => initGit(options),
    enabled: () => options.git,
  }, 
]);

 await tasks.run();
 console.log('%s Your new Redcap Module is ready.', chalk.green.bold('DONE'));
 return true;
}
