import React, {Component} from 'react';
import '@style/App.sass';
import MainComponent from '@app/component/views/main/main.component';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <article className="app-body">
            <section className="app-section">
              <Route path='/' exact component ={MainComponent}/>
            </section>
          </article>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
