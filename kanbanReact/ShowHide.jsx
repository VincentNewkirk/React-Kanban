import React from 'react';

var ShowHide = React.createClass({
  getInitialState: function () {
    return { showEditForm: false };
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
              description={this.props.description}
              />
            : null
        }
      </div>
    )
  },

  onClick: function() {
    this.setState({showEditForm: !this.state.showEditForm});
  }
});

export default ShowHide;