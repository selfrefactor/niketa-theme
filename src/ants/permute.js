'use strict'

/* istanbul ignore next */
const isArray = Array.isArray || function(x){
  return Object.prototype.toString.call(x) === '[object Array]'
}

const swap = function(i, j, arr){

  const temp = arr[ i ]
  arr[ i ] = arr[ j ]
  arr[ j ] = temp

}

export var permute = function(arr){

  if (!isArray(arr)){
    throw new Error('expects an array')
  }

  if (!(this instanceof permute)){
    return new permute(arr)
  }

  this._arr = arr
  this.reset()

}

permute.prototype._get = function(){

  const len = this._arr.length
  let i = -1
  const result = []
  while (++i < len){
    result.push(this._arr[ this._current[ i ] ])
  }

  return result

}

permute.prototype.reset = function(){

  const len = this._arr.length
  if (len === 0){
    this._next = null

    return
  }

  this._current = []
  this._direction = []

  let i = -1
  while (++i < len){
    this._current[ i ] = i
    this._direction[ i ] = -1
  }
  this._direction[ 0 ] = 0
  this._next = this._get()

}

permute.prototype.hasNext = function(){

  this._next = this.next()

  return this._next !== null

}

permute.prototype.next = function(){

  // exit if no more permutations
  if (this._current === null){
    return null
  }

  // return `next` if is not null (from previous call to `hasNext`)
  if (this._next !== null){
    const result = this._next
    this._next = null

    return result
  }

  // find `max` (with index `m`), the largest element in `current` with
  // `direction[m]` != 0
  let max = -1, m = -1
  let i = -1, len = this._arr.length
  while (++i < len){
    if (this._direction[ i ] !== 0 && this._current[ i ] > max){
      max = this._current[ i ]
      m = i
    }
  }

  // exit if direction of all elements is 0
  if (m === -1){
    this._current = null

    return null
  }

  // swap `max` with the element corresponding to its direction ie. `max` is
  // now at index `s`
  const maxDirection = this._direction[ m ]
  const s = m + maxDirection
  swap(m, s, this._current)
  swap(m, s, this._direction)

  // set direction of `max` to DONE if it is at the first or last position,
  // or if the element corresponding to its direction is larger than `max`
  if (s === 0 || s === len - 1 || this._current[ s + maxDirection ] > max){
    this._direction[ s ] = 0
  }

  // set direction of all elements on the left and right of `max` to -1
  // and -1 respectively
  i = -1
  while (++i < len){
    if (this._current[ i ] > max){
      this._direction[ i ] = s < i ? -1 : 1
    }
  }

  return this._get()

}
