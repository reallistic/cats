'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCats, removeCat } from './actions';
import CatList from './components/CatList';

require('./styles/_container.scss');

class App extends Component {
  componentDidMount() {
    this.onRefresh();
  }

  onRemove(rowId) {
    this.props.dispatch(removeCat(rowId));
  }

  onRefresh() {
    this.props.dispatch(fetchCats());
  }

  getContent() {
    if(this.props.error) {
      return (
        <div className='error'>
          <h3>Uh uh. Something broke</h3>
          <p>The cats out the bag, we screwed up, and all the mice are running free</p>
          <button onClick={() => this.onRefresh()}>Retry</button>
        </div>
      );
    }
    else if (this.props.loading) {
      return <div className='loading'>loading</div>;
    }
    return (
      <CatList rows={this.props.rows}
               onRemove={(id) => this.onRemove(id)}
               onRefresh={() => this.onRefresh()} />
    );
  }

  render() {
    return <div className={'cat-app'}>{this.getContent()}</div>;
  }
}


App.propTypes = {
  rows: PropTypes.array.isRequired,
  refreshing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};


function mapStateToProps(state) {
  let rows = state.get('rows');
  let isRefreshing = state.get('isRefreshing');
  return {
    rows: rows.toList().toJS(),
    refreshing: isRefreshing > 0,
    loading: isRefreshing > 0 && rows.size === 0,
    error: state.get('error')
  };
}

export default connect(mapStateToProps)(App);
