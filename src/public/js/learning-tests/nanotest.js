//console.clear();

// WM nano UnitTest
var wUnit = {
  
  failed: 0,
  success: 0,
  processSuccess() {
      this.success++;   
  },
  processFailure(functionName, message) {
      this.failed++;
      console.error('wUnit Test [' + functionName + '] failed: ' + message);
  },
  assert(condition, message) {
    if (condition) {
      this.processSuccess();
    } else {
      this.processFailure(this.f, message);
    }
  },
  assertTrue(condition) {
    this.assert(condition, 'condition \'' + condition + '\' not true');
  },
  assertEquals(expected, actual) {
    this.assert((expected === actual), 'actual \'' + actual + '\' not equal to expected \'' + expected + '\'');
  },
  assertEqualsArrays(expected, actual) {
    this.assertEquals(expected.toString(), actual.toString());
  },
  run(tester) { 
    this.init();
    var testFunctions = Object.keys(tester).filter(function(k){ return ~k.indexOf("test"); });
    for (var f in testFunctions) {
      this.f = testFunctions[f];
      tester[this.f]();
    }
    this.wrapUp();
  },
  init() {
    this.failed = 0;
    this.success = 0;
  },
  wrapUp() {
    console.log(
      'wUnitTest: ' +
      (this.failed + this.success) + ' test(s) run, ' + 
      this.failed + ' failed, ' + 
      this.success + ' successfull.')
  }
}