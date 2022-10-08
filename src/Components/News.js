import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize:8
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number
  }
  toTitleCase = (str)=> {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  constructor(props) {
    super(props); //necessary to put
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = this.toTitleCase(this.props.category);
    }
  
  async updateNews()
  {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });   
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
        this.setState ({articles : parsedData.articles,totalResults:parsedData.totalResults,
          loading: false
        });
        this.props.setProgress(100);
  }
  
    async componentDidMount()
    {
      this.updateNews();
    }

  //  handlePrevClick = async () =>
  // {
  //   this.setState({
  //     page:this.state.page-1
  //   });
  //   this.updateNews();
  // }
  
  // handleNextClick = async () =>
  // {
  //   this.setState({
  //     page:this.state.page+1
  //   });
  //   this.updateNews();
  // }
  
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });   
      let data = await fetch(url);
        let parsedData = await data.json();
        this.setState ({articles :this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults});
  };

  render() {
    
    return (
      <>
       <div className="container my-3">
        <h2 className="text-center my-2">News-Monkey : Top {this.toTitleCase(this.props.category)} HeadLines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
            <div className="contanier mx-3" style={{overflowX:'hidden'}}>
            <div className="row">
                {/* {!this.state.loading && this.state.articles.map((element) => { used when this.state.loading is used*/}
                {this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem
                        title={element.title} 
                        description={element.description}
                        urlToImage={element.urlToImage}
                        url={element.url}
                        date={element.publishedAt}
                        author={element.author ? element.author : "Unknown"}
                        source={element.source.name}
                    />
                  </div>
                })}
              </div>
              </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} onClick={this.handlePrevClick} type="button mx-2" className="btn btn-dark">&larr; Previous</button>
          <button disabled={this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize))} type="button mx-2" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div> */}
       </div>
      </>
    );
  }
}

export default News;
