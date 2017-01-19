import React, {Component} from 'react';
import axios from 'axios';
import QuoteList from './QuoteList';
import QuoteForm from './QuoteForm';
import style from './style';

class QuoteBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadQuotesFromServer = this.loadQuotesFromServer.bind(this);
    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
    this.handleQuoteDelete = this.handleQuoteDelete.bind(this);
    this.handleQuoteUpdate = this.handleQuoteUpdate.bind(this);
  }

  loadQuotesFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ date: res.data })
      })
  }

  handleQuoteSubmit(quote) {
    let quotes = this.state.data;
    quote.id = Date.now();
    let newQuotes = quotes.concat([quote]);
    this.setState({
      data: newQuotes
    });
    axios.post(this.props.url, quote)
      .catch(err => {
        console.error(err);
        this.setState({
          data: quotes
        });
      });
  }

  handleQuoteDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Quote deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleQuoteUpdate(id, quote) {
    axios.put(`${this.props.url}/${id}`, quote)
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.loadQuotesFromServer();
    setInterval(this.loadQuotesFromServer, this.props.pollInterval);
  }

  render() {
      return (
        <div style={ style.quoteBox }>
          <h2 style={ style.title }>
            Quotes
          </h2>
          <QuoteList
            onQuoteDelete={ this.handleQuoteDelete }
            onQuoteUpdate={ this.handleQuoteUpdate }
            data={ this.state.data } />
          <QuoteForm
            onQuoteSubmit={ this.handleQuoteSubmit }/>
        </div>
      )
  }

}

export default QuoteBox;
