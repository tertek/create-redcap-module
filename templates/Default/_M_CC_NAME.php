<?php
// Set the namespace defined in your config file
namespace _NAMESPACE\_M_CC_NAME;


// Declare your module class, which must extend AbstractExternalModule 
class _M_CC_NAME extends \ExternalModules\AbstractExternalModule {

    private $moduleName = "_M_NAME";  

   /**
    * Constructs the class
    *
    */
    public function __construct()
    {        
        parent::__construct();
       // Other code to run when object is instantiated
    }

   /**
    * Hooks _M_NAME module to redcap_every_page_top
    *
    */
    public function redcap_every_page_top($project_id = null) {
        $this->renderModule();
    }

   /**
    * Renders the module
    *
    */
    private function renderModule() {
        #feature js
        $this->includeJavascript();
        #end feature js
        #feature css
        $this->includeCSS();
        #end feature css
    
        print '<p class="_M_KC_NAME">'.$this->helloFrom_M_CC_NAME.'<p>';

    }

    public function helloFrom_M_CC_NAME() {

        return $this->tt("hello_from").' '.$this->moduleName;

    }

    #feature js
   /**
    * Include JavaScript files
    *
    */
    private function includeJavascript() {
        ?>
        <script src="<?php print $this->getUrl('js/main.js'); ?>"></script>
        <script> 
            $(function() {
                $(document).ready(function(){
                    _NAMESPACE__M_CC_NAME.init();
                })
            });
        </script>
        <?php
    }
    #end feature js

    #feature css
   /**
    * Include Style files
    *
    */
    private function includeCSS() {
        ?>
        <link rel="stylesheet" href="<?= $this->getUrl('css/style.css')?>">
        <?php
    }
    #end feature css
}