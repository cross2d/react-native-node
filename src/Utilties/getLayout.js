/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactGetLayout
 */
'use strict';

// get element x, y
function getCumulativeOffset(obj) {
  let left, top;
  left = top = 0;
  if (obj.offsetParent) {
    do {
      left += obj.offsetLeft;
      top += obj.offsetTop;
      obj = obj.offsetParent
    } while (obj);
  }
  return {
    x: left,
    y: top
  };
}

// this functions returns the x, y, width and height of a given dom node
function getLayout(element) {
  const rect = getCumulativeOffset(element);
  return {
    x: rect.x,
    y: rect.y,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

module.exports = getLayout;
