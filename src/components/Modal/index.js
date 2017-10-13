/**
 * Created by colin on 2017/6/12.
 */

/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactModal
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../apis/StyleSheet';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';

class Modal extends Component {

  static propTypes = {
    ...ViewPropTypes,
    animated: PropTypes.bool,
    onDismiss: PropTypes.func,
    transparent: PropTypes.bool,
    visible:PropTypes.bool,
  };

  static defaultProps = {
  };

  render(): ?ReactElement {
    if (this.props.visible === false) {
      if (this.shown) {
        this.props.onDismiss && this.props.onDismiss();
      }
      this.shown = false;
      return null;
    }

    this.shown = true;

    let modalBackgroundColor = null;
    if (this.props.transparent) {
      modalBackgroundColor = {backgroundColor: 'transparent'};
    }

    return (
      <View style={[styles.modal, modalBackgroundColor]}>
        <View style={[styles.container]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#fff',
    zIndex: 9999
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  }
});

Modal.isReactNativeComponent = true;

export default Modal;
