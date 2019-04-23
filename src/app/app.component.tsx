import React, {Component} from 'react';
import '@style/app.sass';
import MainComponent from '@app/component/views/main/main.component';
import {BrowserRouter, Route} from 'react-router-dom';

class AppComponent extends Component {
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

export default AppComponent;
