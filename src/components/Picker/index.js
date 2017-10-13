/**
 * Created by colin on 2017/6/12.
 */

/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactPicker
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ViewPropTypes from '../View/ViewPropTypes';

class Picker extends Component {
  static propTypes = {
    ...ViewPropTypes,
    onChange:PropTypes.bool,
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.any, // string or integer basically
  }

  onChange=(event)=> {
    // shim the native event
    if(this._pickRef!=null){
      event.nativeEvent.newValue = this._pickRef.value;
    }


    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(event.nativeEvent.newValue);
    }
  }


  _setPickerRef = element => {
    this._pickRef = element;
  };

  render() {
    return (
      <select
        onChange={this.onChange}
        ref={this._setPickerRef}
        style={{
          margin: 10,
          color: 'inherit',
          font: 'inherit',
          ...this.props.style
        }}
        value={this.props.selectedValue}
      >
        {this.props.children}
      </select>
    );
  }
}

class PickerItem extends Component {
  static propTypes = {
    label: PropTypes.string, // string or integer basically,
    value: PropTypes.any
  }

  render() {
    return <option value={this.props.value}>{this.props.label}</option>;
  }

}


// Picker.Item = React.createClass({
//   propTypes: {
//     value: PropTypes.any, // string or integer basically
//     label: PropTypes.string,
//   },
//
//   render: function () {
//     return <option value={this.props.value}>{this.props.label}</option>;
//   },
// });

Picker.Item = PickerItem

// autobind(Picker);

Picker.isReactNativeComponent = true;

export default Picker;
