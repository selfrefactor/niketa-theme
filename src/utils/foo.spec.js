import {createColorsHash} from './create-colors-hash';

test('happy', () => {
  //  {
  //   COLOR_0: '#089fbf',
  //   COLOR_1: '#282828',
  //   COLOR_2: '#089fbf',
  //   COLOR_3: '#F92672',
  //   COLOR_4: '#DF8618'
  // }
  let result = createColorsHash([ '#089fbf', '#282828', '#089fbf', '#F92672', '#DF8618' ]);
  console.log(result);
});