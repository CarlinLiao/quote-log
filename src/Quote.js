import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Quote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: ''
    };

    this.deleteQuote = this.deleteQuote.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleQuoteUpdate = this.handleQuoteUpdate.bind(this);
  }

  updateQuote(e) {
    e.preventDefault();
    this.setState({
      toBeUpdated: !this.state.toBeUpdated
    });
  }

  handleQuoteUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let quote = {
      author: author,
      text: text
    };
    this.props.onQuoteUpdate(id, quote);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    })
  }

  deleteQuote(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onQuoteDelete(id);
    console.log('Quote deleted')
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleAuthorChange(e) {
    this.setState({
      author: e.target.value
    });
  }

  rawMarkup () {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div style={ style.quote }>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
        <a
          style={ style.updateLink }
          href='#'
          onClick={ this.updateQuote }>
          Update
        </a>
        <a style={ style.deleteLink }
          href='#'
          onClick={ this.deleteQuote }>
          Delete
        </a>
        <h3>{this.props.author}</h3>
        { (this.state.toBeUpdated)
          ? ( <form onSubmit={ this.handleQuoteUpdate }>
                <input
                  type='text'
                  placeholder='Change name'
                  style={style.quoteFormAuthor}
                  value={this.state.author}
                  onChange={this.handleAuthorChange} />
                <input
                  type='text'
                  placeholder='Update quote'
                  style={style.quoteFormText}
                  value={this.state.text}
                  onChange={this.handleTextChange} />
                <input
                  type='submit'
                  style={style.quoteFormPost}
                  value='Update' />
              </form>)
          : null }
      </div>
    );
  }
}

export default Quote;
