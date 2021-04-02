# create-redcap-module
A simple CLI to generate new REDCap external modules.

![alt text](/create-redcap-module-carbon.png "Screenshot")

## Requirements

- [Node.js](https://nodejs.org/en/)

## How to use
Navigate into your redcap modules folder

```bash
   cd modules
``` 

Run the module generator directly over npx

```bash
   npx create-redcap-module
``` 

After completing the necessary input, a module folder will be available at `/redcap/modules/`.


## Roadmap

- ~~Optimize template generation~~
- Add more features to template(s) (BabelJS, phpunit, composer, ..)
- Add more template variations (Action Tag, API Extension, ..)
- Add help option/explanation to CLI (optionator)

- Automatic npm publishing flow (@release)

## Developer Notice

Feature and pull requests are welcome.

## Changelog

Version | Description
------- | --------------------
v1.0.0  | Initial release.
v1.0.1  | Added first features.
v1.1.0  | Rewrite of most parts.
v1.1.1  | Update Readme(s).
v1.1.2  | Fix path building cross platform.
