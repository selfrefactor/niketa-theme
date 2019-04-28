# Dev notes

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