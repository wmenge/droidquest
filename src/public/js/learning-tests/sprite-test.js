spriteTests = {
  
  // Test 'animation' of a single frame
  testFactory() {
 // 	wUnit.assertTrue(testSprite instanceof Sprite);
 // 	wUnit.assertTrue(testSpriteSheet instanceof Sprite);
 // 	wUnit.assertTrue(testSpriteSheet instanceof SpriteSheet);

  },
  testSingleFrameAnimation() {
  	wUnit.assertEquals(0, spriteSheet.animations["Front"].getFrameIndex(0));
    wUnit.assertEquals(0, spriteSheet.animations["Front"].getFrameIndex(326));
  },
  testTwoFrameAnimation() {
  	wUnit.assertEquals(0, spriteSheet.animations["FrontWalk"].getFrameIndex(0));
  	wUnit.assertEquals(1, spriteSheet.animations["FrontWalk"].getFrameIndex(251));
  	wUnit.assertEquals(0, spriteSheet.animations["FrontWalk"].getFrameIndex(501));
  }/*,
  testAssertEquals() {
    wUnit.assertEquals('a', 'a');
    wUnit.assertEquals('a', 'b');
  },
  testAssertEqualsArray() {
    wUnit.assertEqualsArrays([1,2,3], [1,2,3]);
    wUnit.assertEqualsArrays([1,2,3], [3,2,1]);    
  }*/
  
}

var spriteSheet;
var testSprite;
var testSpriteSheet;

(async function() {

	let response = await fetch('/resources/sprites/r2d2.json'); 
	var sheetInformation = await response.json();
	spriteSheet = new SpriteSheet(null, sheetInformation);

	testSprite = await getSprite('tower');
	testSpriteSheet = await getSprite('r2d2');
	
	wUnit.run(spriteTests);

})();