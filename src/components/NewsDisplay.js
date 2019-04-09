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
          console.log(data.results);
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
  componentDidUpdate(prevProps) {
    if (prevProps["*"] !== this.props["*"]) {
      this.setState({ loadError: false });
      if (this.props["*"]) {
        let category = this.props["*"]
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
  }
  render() {
    let { loading, loadError, newsArticles } = this.state;
    if (!loading && !loadError) {
      return (
        <main className="news-display" id="main-content">
          {newsArticles.map(article => {
            return (
              <article className="news-card" key={article.title}>
                <div className="img-container">
                  <a href={article.url}><img className="test-img" alt={article.title}
                    src={article.multimedia[3] ? article.multimedia[3].url.replace("210", "440") : 'https://via.placeholder.com/440x293?text=No+Image+Provided'} /></a>
                </div>
                <a href={article.url}><h2>{article.title}</h2></a>
                <p>{article.abstract}</p>
                <p className="byline">{article.byline}</p>
              </article>
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