import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
<<<<<<< HEAD
import Calendar from './Calendar';

ReactDOM.render(<Calendar />, document.getElementById('root'));
=======
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
>>>>>>> master
registerServiceWorker();
