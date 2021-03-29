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
        #feature jscss
        $this->includeJavascript();
        $this->includeCSS();
        #end feature jscss
    
        print '<p class="_M_KC_NAME">'.$this->helloFromExternalModule.'<p>';

    }

    public function helloFromExternalModule() {

        return $this->tt("hello_from").' '.$this->moduleName;

    }

    #feature jscss
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

   /**
    * Include Style files
    *
    */
    private function includeCSS() {
        ?>
        <link rel="stylesheet" href="<?= $this->getUrl('css/style.css')?>">
        <?php
    }
    #end feature jscss
}