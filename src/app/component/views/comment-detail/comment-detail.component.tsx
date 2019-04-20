import React, { Component } from 'react';
import faker from 'faker';

interface IProp {
    author: {name: string, avatar: string, comment: string}
}

export default class CommentDetail extends Component<IProp> {

  render() {
    return (
      <div className="comment">
        <a href="/" className="avatar">
          <img src={this.props.author.avatar} alt="" />
        </a>
        <div className="content">
          <a href="" className="author">
            {this.props.author.name}
          </a>
          <div className="metadata">
            <span className="date">{new Date().toLocaleString()}</span>
          </div>
          <div className="text">{this.props.author.comment}</div>
        </div>
      </div>
    );
  }
}
