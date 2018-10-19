# Droid Quest

A html point and click classic inspired by [Thimbleweed Park](https://thimbleweedpark.com) and 
the [development blog](https://blog.thimbleweedpark.com) of that game. A playable version can be found [here](https://droidquest.wilcomenge.nl).

## Promises
Some magic with [promises](https://javascript.info/async-await) is used to be able to create intuitive, synchronous-like scripts. This means that - if desired - 
you can let the script wait until an action of an object is completed before starting the next.

For example, a script to let an Actor move perpetually pace back and forth you would write:

```
while (true) {
  await actor.moveRelative({ x:  50, y: 0});
  await actor.moveRelative({ x: -50, y: 0});
}
```

With this method, the second call to ```moveRelative()``` will occur after the first move has been completely executed.

## How to run

You will need a local webserver as the code will fetch json files from its own directories. This is not possible without a webserver as you will run into a ```"Not allowed to load local resources error"``` on modern browsers.

First, clone the repo. It's all plain vanilla javascript. 

### using Python:

If you have python installed, navigate to the /src/public directory and run:

```
$ python -m http.server 8000
```

Then you can access the game at http://0.0.0.0:8000

### using node.js

Navigate to the root of the repo and install the dependencies:

```
$ npm install
```

Run the server:
```
$ node src/static-server-app.js 
```

You can access the game at http://127.0.0.1:3000

## Supported browsers

At the moment only Safari and Chrome on desktop have been tested.
