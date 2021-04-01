# create-redcap-module
A simple CLI to generate new REDCap external modules.

## Requirements

- [Node.js](https://nodejs.org/en/)

## Setup

Navigate into your redcap modules folder

```bash
   cd modules
``` 

Run the module generator directly over npx

```bash
   npx create-redcap-module
``` 

After completing the necessary input, a module folder will be available.

## Testing

**Testing Requirements**.
- [Composer](https://getcomposer.org/)

1. Require phpunit within your module folder `/redcap/modules/your-module-name` and check if it is running:

```bash
   composer require --dev phpunit/phpunit
``` 

```bash
   ./vendor/bin/phpunit --version
``` 

2. Run your tests that are written within your `/tests` folder:

```bash
    ./vendor/bin/phpunit tests
``` 
Read more about PHP Unit Testing in the official [PHPUnit Manual](https://phpunit.readthedocs.io/en/9.5/index.html).


## Docs about REDCap external module development

On your REDCap installation checkout the various documentations:
- External Module Framework - Official Documentation
- Methods Provided by the External Module Framework
- External Module Framework Versioning

## To Do

-[x] Optimize template generation
-[ ] Add more features (BabelJS, phpunit, composer, ..)
-[ ] Add more templates (ActionTag, API Extension, ..)
