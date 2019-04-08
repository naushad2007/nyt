import React, { Component } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const ENV = runtimeEnv();

class NewsDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      loadError: false,
      newsArticles: []
    }
  }
  componentDidMount() {
    /*Checks for url paramater and gets news for that category. 
     * no paramater defaults to home page news */
    if (this.props["*"]) {
      let category = this.props["*"]
      fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${ENV.REACT_APP_CLIENT_ID}`).then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ loading: false });
        })
        .catch(error => {
          console.clear();
          this.setState({ loadError: true });
        });
    } else {
      fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${ENV.REACT_APP_CLIENT_ID}`).then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ loading: false });
        })
        .catch(error => {
          console.clear();
          this.setState({ loadError: true });
        });
    }

  }
  componentDidUpdate(prevProps) {
    if (prevProps["*"] !== this.props["*"]) {
      if (this.props["*"]) {
        let category = this.props["*"]
        fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${ENV.REACT_APP_CLIENT_ID}`).then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({ loading: false });
          })
          .catch(error => {
            console.clear();
            this.setState({ loadError: true });
          });
      } else {
        fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${ENV.REACT_APP_CLIENT_ID}`).then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({ loading: false });
          })
          .catch(error => {
            console.clear();
            this.setState({ loadError: true });
          });
      }
    }
  }
  render() {
    let { loading, loadError, newsArticles } = this.state;
    if (!loading && !loadError) {
      return (<p>hi :)</p>)
    }
    else if (loadError) {
      return (<p>Failed to load content.</p>)
    }
    else {
      return (<p>Loading...</p>)
    }
  }
}

export default NewsDisplay;