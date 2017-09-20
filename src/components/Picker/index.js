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
import autobind from 'autobind-decorator';

const PICKER = 'picker';

class Picker extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.any, // string or integer basically
  }

  onChange(event) {
    // shim the native event
    event.nativeEvent.newValue = this.refs[PICKER].value;

    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(event.nativeEvent.newValue);
    }
  }

  render() {
    return (
      <select
        ref={PICKER}
        value={this.props.selectedValue}
        style={{
          margin: 10,
          color: 'inherit',
          font: 'inherit',
          ...this.props.style
        }}
        onChange={this.onChange.bind(this)}
      >
        {this.props.children}
      </select>
    );
  }
}

class PickerItem extends Component {
  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.string, // string or integer basically
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
