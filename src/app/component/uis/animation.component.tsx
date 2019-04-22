import {Component, ReactElement} from 'react';
import React from 'react';


const hideStyle = {
  opacity: 0,
}

const showStyle = {
  opacity: 1,
  animationName: 'downToUp',
  animationDuration: '.7s',
  animationFillMode: 'forwards'
}

export default class AnimateComponent extends Component<{show: boolean}> {

  render() {
    const style = this.props.show ? showStyle: hideStyle;
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as ReactElement, {
          ...(child.props || {}),
          style
        })
      } else {
        return <span style={style}>{child}</span>
      }
    })
  }
}
