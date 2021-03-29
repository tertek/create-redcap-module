<?php  namespace _NAMESPACE\_M_CC_NAME;

class CreateRedcapModuleTest extends BaseTest
{
   function testYourMethod(){
      $expected = 'Hello from _M_NAME';
      // Shorter syntax without explicitly specifying "->module" is also supported.
      $actual = $this->module->helloFromExternalModule();

      $this->assertSame($expected, $actual);
      
   }

}