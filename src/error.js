import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  static getDerivedStateFromError(error) {
    return { error: true };
  }
  render() {
    return this.state.error ? <div>something wrong</div> : this.props.children;
  }
}
