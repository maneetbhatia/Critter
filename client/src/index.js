import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CurrentUserProvider } from './Components/CurrentUserContext';
import { TweetProvider } from './Components/TweetContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TweetProvider><CurrentUserProvider><App /></CurrentUserProvider></TweetProvider>);

