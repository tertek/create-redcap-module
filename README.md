# create-redcap-module
A simple CLI to generate new REDCap external modules.

## Requirements

- Node.js
- Composer (for testing)

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

If you would like to run tests with phpunit you need to have composer installed.
1. Require phpunit within your module folder and check if it is running:

```bash
   composer install
``` 
2. Run your tests which are written within your `/tests` folder:

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

-[ ] Add more features.
-[ ] Add more templates (ActionTag, API Extend, etc.)
-[ ] Optimize template generation.
