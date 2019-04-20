import React, { Component } from 'react';
import '@style/App.sass';
import faker from 'faker';
import CommentDetail from '@app/component/views/comment-detail/comment-detail.component';
import { AuthorModel } from '@app/model/arthor.model';
import SearchRxComponent from '@app/component/views/search-rx/search-rx.component';
import SearchMobxComponent from '@component/views/search-mobx/search-mobx.component';
import {SelectComponent} from '@component/views/select/Select.component';

// https://github.com/piotrwitek/react-redux-typescript-guide#--with-default-props
interface IState {
  value: number;
  authors: AuthorModel[];
}
class App extends Component {
  readonly state: IState = {
    value: 0,
    authors: [
      AuthorModel.create({ name: 'Kelly', avatar: faker.image.avatar(), comment: 'ddd' }),
      AuthorModel.create({ name: 'Mike', avatar: faker.image.avatar(), comment: 'Hi' }),
      AuthorModel.create({ name: 'Deanna', avatar: faker.image.avatar(), comment: 'Hi,Hi' }),
    ],
  };

  increment() {
    setInterval(() => {
      this.setState((prevState: IState) => {
        return { value: ++prevState.value };
      });
    }, 5000);
  }

  componentDidMount() {
    // this.increment();
  }

  render() {
    return (
      <div>
        <div style={{float: 'left'}}>
        <SearchRxComponent />
        </div>
        <div style={{float: 'left'}}>
        <SearchMobxComponent />
        </div>
        <div className="ui container comments" style={{clear: 'both'}}>
          {this.state.authors.map((author, i) => {
            return <CommentDetail author={author} key={i} />;
          })}
        </div>
        <div>
          <SelectComponent values={['State', 'Should', 'Be', 'Synchromous']}
          onSelect={(value:string) => console.log(value)}/>
        </div>
      </div>
    );
  }
}

export default App;
