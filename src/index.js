import React from 'react';
import ReactDOM from 'react-dom';
import QuoteBox from './QuoteBox';

ReactDOM.render(
  <QuoteBox
    url='http://localhost:3001/api/quotes'
    pollInterval={2000} />,
  document.getElementById('root')
);
