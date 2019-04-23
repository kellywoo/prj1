import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from '@app/app.component';
import * as serviceWorker from './serviceWorker';
// import {spy} from 'mobx'

ReactDOM.render(<AppComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// spy((event)=>{
//   if(event.type === 'action') {
//     console.log(`${event.name} with args:`, event.arguments);
//   }
// });
