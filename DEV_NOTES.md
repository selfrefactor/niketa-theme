# Dev notes

> Background color cannot have opacity as terminal colors depend on that

## Opacity

> Set (opacity)color pair as [FOO, FOO] in order to persist it.

## Gradient

If the first color is opacity the target is other other opacity color or opacity target.

If the first color has no opacity, then the second color cannot have opacity.

## Dark themes

They are always deployed from `baboon` folder

## Postponed TODO

[ ] Maybe few words before the screen

[] on hover of any niketa icon show jest out

[ ] Editor background and COLOR_0 should have the same direction

[] Try to bind method comments with VSCode hint worker

[] Dev themes are in `dev` folder

## TODO

publish theme has wrong theme name - foo.bar instead of FooBar

remove show colors

## Because ask

```javascript

function TARGET_OPACITY(){ return true }
function TARGET_ONLY_FIRST_FLAG(){ return true }
function TARGET_INDEX(){ return 2 }
const PALLETE_INDEX = 29 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : [ translate('special.6'), 'ff' ],
  // COLOR_BACK      : [ '#30322ef1', '5a' ],
  COLOR_SECONDARY : [ translate('special.4'), translate('special.0') ],
  COLOR_SELECTION : [ translate('back.opacity.10'), fetchZero ],
  COLOR_0         : [ '#fafafa', '#fafa33' ],
  // COLOR_0: [ '#fafafa56', 'aa' ],
  // COLOR_0         : [ translate('red.3'), translate('red.3') ],
  COLOR_1         : [ translate('light.yellow.1'), translate('red.0') ],
  COLOR_2         : [ translate('yellow.6'), translate('red.1') ],
  COLOR_3         : [ translate('light.blue.1'), translate('light.blue.1') ],
  COLOR_4         : [ translate('light.blue.0'), translate('back.14') ],
  COLOR_5         : [ translate('back.opacity.7'), fetchZero ],
}
```

## Because always

```
function TARGET_OPACITY(){ return true }
function TARGET_INDEX(){ return 0 }
const PALLETE_INDEX = 11 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : [ '#2a3343e9', '66' ],
  COLOR_SECONDARY : [ '#859da9e9', fetchZero ],
  COLOR_SELECTION : [ '#282c34', '#fafafa' ],
  COLOR_0         : [ '#f7ddb2f1', '#f7ddb2f1' ],
  COLOR_1         : [ '#7bb3bd', '#1111aa' ],
  COLOR_2         : [ '#e47e7d', translate('pink.3') ],
  COLOR_3         : [ '#f1aa22', '#c2be6c' ],
  COLOR_4         : [ '#DB618F', '#fafafa' ],
  COLOR_5         : [ '#66cc99', '#b5a2d0' ],
}
```

## Because never

```

function TARGET_OPACITY(){ return true }
function TARGET_ONLY_FIRST_FLAG(){ return true }
function TARGET_INDEX(){ return 2 }
const PALLETE_INDEX = 6 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : [ '#303b45', '#305b45' ],
  COLOR_SECONDARY : [ translate('random.3'), translate('back.8') ],
  COLOR_SELECTION : [ translate('back.opacity.10'), fetchZero ],
  COLOR_0         : [ '#15a1ae', '#fafafa' ],
  COLOR_1         : [ '#ebea8b', translate('random.2') ],
  COLOR_2         : [ '#f47d4fff', '77' ],
  COLOR_3         : [ '#E5AA83', '#E5AA83' ],
  COLOR_4         : [ '#15b8ae', '#1541ae' ],
  COLOR_5         : [ '#ec6dcdf6', '44' ],
}
```

## Roadmap April 2019

[x] Dark themes are not uploaded here, but still published to mono repo

[x] Allow [OPACITY, COLOR] to actually generate gradient

[x] script to copy theme to mono repo folder

[x] opacity colors can still be darken

[x] Once new generate pallete theme is done, move the test to deprecated as this will pin the palletes  

[x] Generated palletes just change COLOR_1 to COLOR_5

[x] Generate uniq set of COLOR_0 till COLOR_5 for pallete bases

[x] Each theme is also a separate published theme

[x] Dark theme based on `90s` theme

[x] Use lerna for monorepo

[x] get max levels ant(as instead of 22 we call this ant)

[x] increase dev theme levels from 22

[X] LIGHTEST fix

[x] Set React, Jest, JSON, JS folder in data to test out themes

[] Fix readme dark as it is not deleted on publish and has wrong image path

[] Change dark theme from mono repo
