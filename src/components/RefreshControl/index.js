/**
 * Created by colin on 2017/6/6.
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActivityIndicator from './../ActivityIndicator';
import { Mixin as NativeMethodsMixin } from './../../Utilties/NativeMethodsMixin';
import mixin from 'react-mixin';
import autobind from 'autobind-decorator';
import ViewPropTypes from '../View/ViewPropTypes';

const RefreshLayoutConsts = {SIZE: {}};

class RefreshControl extends Component {

  static propTypes =  {
    ...ViewPropTypes,
    refreshing:PropTypes.bool
  }

  static SIZE = RefreshLayoutConsts.SIZE

  componentDidMount() {
    this._lastNativeRefreshing = this.props.refreshing;
  }

  componentDidUpdate(prevProps: {refreshing: boolean}) {
    // RefreshControl is a controlled component so if the native refreshing
    // value doesn't match the current js refreshing prop update it to
    // the js value.
    if (this.props.refreshing !== prevProps.refreshing) {
      this._lastNativeRefreshing = this.props.refreshing;
    } else if (this.props.refreshing !== this._lastNativeRefreshing) {
      this._nativeRef.setNativeProps({refreshing: this.props.refreshing});
      this._lastNativeRefreshing = this.props.refreshing;
    }
  }

  _setActivityIndicatorRef = element => {
    this._nativeRef = element;
  };

  render() {
    // TODO
    return (
      <ActivityIndicator
        {...this.props}
        onRefresh={this._onRefresh}
        ref={ this._setActivityIndicatorRef }
      />
    );
  }

  _onRefresh() {
    this._lastNativeRefreshing = true;

    this.props.onRefresh && this.props.onRefresh();

    // The native component will start refreshing so force an update to
    // make sure it stays in sync with the js component.
    this.forceUpdate();
  }
}

mixin.onClass(RefreshControl, NativeMethodsMixin);
autobind(RefreshControl);
RefreshControl.isReactNativeComponent = true;

export default RefreshControl;
