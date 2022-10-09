import React from 'react'

const NewsItem = (props)=> {
        let { title, description, urlToImage, url, date, author, source} = props;// destructuring in js
    return (
      <div className='my-3'  >
        <div className="card" >
        <img src={urlToImage} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">Last updated {new Date(date).toGMTString()} by {author}</small></p>
            <p className='card-text'><strong>Source : {source}</strong></p>
            <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">READ MORE</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem
