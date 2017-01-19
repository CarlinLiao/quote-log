import React, {Component} from 'react';
import Quote from './Quote';
import style from './style';

class QuoteList extends Component {

  render() {
    let quoteNodes = this.props.data.map(quote => {
      return (
        <Quote
          author={ quote.author }
          uniqueID={ quote['_id'] }
          onQuoteDelete={ this.props.onQuoteDelete }
          onQuoteUpdate={ this.props.onQuoteUpdate }
          key={ quote['_id'] }>
          { quote.text }
        </Quote>
      )
    })

    return (
      <div style={ style.quoteList }>
        { quoteNodes }
      </div>
    )

  }

}

export default QuoteList;
