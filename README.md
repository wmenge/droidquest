# Droid Quest

A html point and click classic inspired by [Thimbleweed Park](https://thimbleweedpark.com) and 
the [development blog](https://blog.thimbleweedpark.com) of that game

## Promises
Some magic with [promises](https://javascript.info/async-await) is used to be able to create intuitive, synchronous-like scripts. This means that - if desired - 
you can let the script wait until an action of an object is completed before starting the next.

For example, a script to let an Actor move perpetually pace back and forth you would write:

````
while (true) {
  await actor.moveRelative({ x:  50, y: 0});
  await actor.moveRelative({ x: -50, y: 0});
}
````

With this method, the second call to ````moveRelative()```` will occur after the first move has been completely executed.

## How to run
Just clone the repo and point your browser to the /src/index.html file. It's all plain vanilla javascript. 

At the moment only Safari and Chrome on desktop have been tested.
