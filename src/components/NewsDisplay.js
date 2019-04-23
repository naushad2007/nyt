import React, { Component } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import NewsCard from "./NewsCard";

const ENV = runtimeEnv();

class NewsDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      //loadError is used for invalid url params
      loadError: false,
      newsArticles: []
    }

    this.getArticles = this.getArticles.bind(this);
  }
  getArticles(category) {
    /*Checks for url paramater and gets news for that category. 
     * if no paramater provided defaults to home page news */
    if (category) {
      fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${ENV.REACT_APP_CLIENT_ID}`).then(response => response.json())
        .then(data => {
          this.setState({ loading: false, newsArticles: data.results });
        })
        .catch(error => {
          console.clear();
          this.setState({ loadError: true });
        });
    } else {
      fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${ENV.REACT_APP_CLIENT_ID}`).then(response => response.json())
        .then(data => {
          this.setState({ loading: false, newsArticles: data.results });
        })
        .catch(error => {
          console.clear();
          this.setState({ loadError: true });
        });
    }
  }
  componentDidMount() {
    this.getArticles(this.props["*"])
  }
  componentDidUpdate(prevProps) {
    if (prevProps["*"] !== this.props["*"]) {
      //clear any errors that may have occured during previous fetch attempt
      this.setState({ loadError: false });

      this.getArticles(this.props["*"])
    }
  }
  render() {
    let { loading, loadError, newsArticles } = this.state;
    //If the data was successfully fetched render news
    if (!loading && !loadError) {
      return (
        <main className="news-display" id="main-content">
          {newsArticles.map(article => {
            return (
              <NewsCard article={article} />
            )
          })}
        </main>
      )
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