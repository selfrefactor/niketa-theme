!function a(b, c, d){
  function e(g, h){
    if (!c[ g ]){
      if (!b[ g ]){
        const i = typeof require === 'function' && require

        if (!h && i){ return i(g, !0) } if (f){ return f(g, !0) } const j = new Error('Cannot find module \'' + g + '\'')

        throw j.code = 'MODULE_NOT_FOUND', j
      } const k = c[ g ] = { exports : {} }

      b[ g ][ 0 ].call(k.exports, a => {
        const c = b[ g ][ 1 ][ a ]

        return e(c ? c : a)
      }, k, k.exports, a, b, c, d)
    }

    return c[ g ].exports
  } for (var f = typeof require === 'function' && require, g = 0;g < d.length;g++){ e(d[ g ]) }

  return e
}({
  1 : [ function(a, b, c){
    'use strict';Object.defineProperty(c, '__esModule', { value : !0 });const d = {
      inputFormat : 'hex',
      stops       : 5,
      colorArray  : [ '#fff', '#000' ],
    }

    c.default = d
  }, {} ],
  2 : [ function(a, b, c){
    (function(b){
      'use strict';function c(a){ return a && a.__esModule ? a : { default : a } } const d = function(){
          function a(a, b){
            let c = [], d = !0, e = !1, f = void 0

            try { for (var g, h = a[ Symbol.iterator ]();!(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b);d = !0){ } } catch (a){ e = !0, f = a } finally { try { !d && h.return && h.return() } finally { if (e){ throw f } } }

            return c
          }

          return function(b, c){ if (Array.isArray(b)){ return b } if (Symbol.iterator in Object(b)){ return a(b, c) } throw new TypeError('Invalid attempt to destructure non-iterable instance') }
        }(), e = a('./polyfill'), f = a('./utils'), g = a('./defaultOptions'), h = c(g)

      !function(a){
        function b(a){
          if (a = (0, e.objectAssign)({}, this.options, a), a.stops < a.colorArray.length){ throw 'Number of stops cannot be less than colorArray.length' }

          return this.computeStops(a)
        }b.prototype.options = h.default, b.prototype.computeStops = function(a){
          const b = [], c = function(a){
              switch (a.inputFormat){

              case 'hex': return (0, f.extractHEX)(a.colorArray);case 'rgb': return (0, f.extractRGB)(a.colorArray);case 'hsl': return (0, f.extractHSL)(a.colorArray)

              }
            }, e = function(a){
              for (let c = a.colorArray, e = 1 / (a.stops - 1), g = 0, h = 0;h < a.stops;h++){
                if (a.inputFormat == 'hex' || a.inputFormat == 'rgb'){
                  const i = (0, f.propBezInterpolate)([ 'r', 'g', 'b' ])(c)(g), j = d(i, 3), k = j[ 0 ], l = j[ 1 ], m = j[ 2 ]

                  b.push((0, f.returnRGBStr)([ k, l, m ]))
                } else if (a.inputFormat == 'hsl'){
                  const n = (0, f.propBezInterpolate)([ 'h', 's', 'l' ])(c)(g), o = d(n, 3), p = o[ 0 ], q = o[ 1 ], r = o[ 2 ]

                  b.push((0, f.returnHSLStr)([ p, q, r ]))
                }g += e
              }
            }

          return a.colorArray = c(a), e(a), b
        }, a.gradStop = function(a){ return new b(a) }
      }(typeof window !== 'undefined' ? window : b)
    }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
  }, {
    './defaultOptions' : 1,
    './polyfill'       : 3,
    './utils'          : 4,
  } ],
  3 : [ function(a, b, c){
    'use strict';Object.defineProperty(c, '__esModule', { value : !0 });c.mathTrunc = function(){ return Math.trunc ? Math.trunc : function(a){ return a === 0 ? a : a < 0 ? Math.ceil(a) : Math.floor(a) } }(), c.objectAssign = function(){
      return Object.assign ? Object.assign : function(a){
        if (void 0 === a || a === null){ throw new TypeError('Cannot convert undefined or null to object') } for (var b = Object(a), c = 1;c < arguments.length;c++){
          const d = arguments[ c ]

          if (void 0 !== d && d !== null){ for (const e in d){ d.hasOwnProperty(e) && (b[ e ] = d[ e ]) } }
        }

        return b
      }
    }()
  }, {} ],
  4 : [ function(a, b, c){
    'use strict';Object.defineProperty(c, '__esModule', { value : !0 }), c.returnHSLStr = c.returnRGBStr = c.extractHSL = c.extractRGB = c.extractHEX = c.propBezInterpolate = void 0;const d = function(){
        function a(a, b){
          let c = [], d = !0, e = !1, f = void 0

          try { for (var g, h = a[ Symbol.iterator ]();!(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b);d = !0){ } } catch (a){ e = !0, f = a } finally { try { !d && h.return && h.return() } finally { if (e){ throw f } } }

          return c
        }

        return function(b, c){ if (Array.isArray(b)){ return b } if (Symbol.iterator in Object(b)){ return a(b, c) } throw new TypeError('Invalid attempt to destructure non-iterable instance') }
      }(), e = a('./polyfill'), f = function(a){
        const b = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(a),
          c = b.map(a => parseInt(a, 16)),
          e = d(c, 4),
          f = e[ 1 ],
          g = e[ 2 ],
          h = e[ 3 ]

        return {
          r : f,
          g : g,
          b : h,
        }
      }, g = function(a, b, c){
        return a.split('').slice(b, c)
          .join('')
      }, h = function(a){ return a.map(a => a.length === 4 ? '#' + (a[ 1 ] + a[ 1 ] + a[ 2 ] + a[ 2 ] + a[ 3 ] + a[ 3 ]) : a.length === 7 ? a : void 0) }

    c.propBezInterpolate = function(a){
      return function(b){
        return function(c){
          let d = 1 - c, f = void 0

          return a.map(a => b.length == 2 ? f = d * b[ 0 ][ a ] + c * b[ 1 ][ a ] : b.length == 3 ? f = Math.pow(d, 2) * b[ 0 ][ a ] + 2 * d * c * b[ 1 ][ a ] + Math.pow(c, 2) * b[ 2 ][ a ] : b.length == 4 && (f = Math.pow(d, 3) * b[ 0 ][ a ] + 3 * Math.pow(d, 2) * c * b[ 1 ][ a ] + 3 * d * Math.pow(c, 2) * b[ 2 ][ a ] + Math.pow(c, 3) * b[ 3 ][ a ]), (0, e.mathTrunc)(f))
        }
      }
    }, c.extractHEX = function(a){ return h(a).map(a => f(a)) }, c.extractRGB = function(a){
      return a.map(a => {
        const b = g(a, 4, -1).split(','), c = d(b, 3), e = c[ 0 ], f = c[ 1 ], h = c[ 2 ]

        return {
          r : e,
          g : f,
          b : h,
        }
      })
    }, c.extractHSL = function(a){
      return a.map(a => {
        a = g(a, 4, -1).split(',');const b = a[ 0 ], c = g(a[ 1 ], 0, -1), d = g(a[ 2 ], 0, -1)

        return {
          h : b,
          s : c,
          l : d,
        }
      })
    }, c.returnRGBStr = function(a){ return 'rgb(' + a[ 0 ] + ', ' + a[ 1 ] + ', ' + a[ 2 ] + ')' }, c.returnHSLStr = function(a){ return 'hsl(' + a[ 0 ] + ', ' + a[ 1 ] + '%, ' + a[ 2 ] + '%)' }
  }, { './polyfill' : 3 } ],
}, {}, [ 1, 2, 3, 4 ])
