<?php  namespace _NAMESPACE\_M_CC_NAME;

class _M_CC_NAMETest extends BaseTest
{
   function test_M_CC_NAME(){
      $expected = 'Hello from _M_NAME';
      // Shorter syntax without explicitly specifying "->module" is also supported.
      $actual = $this->module->helloFrom_M_CC_NAME();

      $this->assertSame($expected, $actual);
      
   }

}