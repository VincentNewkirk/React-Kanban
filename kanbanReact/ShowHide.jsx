'use strict';
import React from 'react';
import EditForm from './EditForm.jsx';
import style from ".././scss/styles.scss";

var ShowHide = React.createClass({
  getInitialState: function () {
    return { showEditForm: false };
  },

  onClick: function() {
    this.setState({showEditForm: !this.state.showEditForm});
  },

  render: function() {
    return(
      <div>
        <div id="editButton" onClick={this.onClick}>
          EDIT
        </div>
        {
          this.state.showEditForm
            ? <EditForm
              author={this.props.author}
              assigned={this.props.assigned}
              uniqueID={this.props.uniqueID}
              priority={this.props.priority}
              name={this.props.name}
              handler={this.props.handler}
              status={this.props.status}
              edit={this.props.edit}
              hideDiv={this.onClick}
              description={this.props.description}
              index={this.props.index}
              />
            : null
        }
      </div>
    )
  }

});

export default ShowHide;