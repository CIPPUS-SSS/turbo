#Turbo (it is deprecated and move to [here](https://github.com/ggaaooppeenngg/turbo))

Turbo is an open and cross-platform dictionary

##Dependencies

*  node-v0.10.33
*  node-webkit-v0.8.6
*  clipboard manipulation tool xclip(Linux),clip(Windows),pbcopy(Mac OS X)

##Test

Turbo is tested by [mocha](https://github.com/mochajs/mocha),in order to install mocha,run `npm -g install mocha`

```
cd test/
mocha
```

##BUG:



##For Developers:

`cp sync.json.sample to sync.json`

If you come across this error,pleas check this [wiki](https://github.com/rogerwang/node-webkit/wiki/Troubleshooting#lack-of-libudevso0)

```
nw: error while loading shared libraries: libudev.so.0: cannot open shared object file: No such file or directory
```


##TODO:

~~add off-line dictionares support~~

~~zone-intellegent translation~~

*  add dictionary settings
