
import noImg from '../assets/images/plc-holder.svg'
import './News.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import NewsModal from './NewsModal'


const categories = [
    'general',
    'world',
    'business',
    'technology',
    'entertaiment',
    'sports',
    'science',
    'health',
    'nation',
]

const News = () => {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);


    useEffect(()=>{
        const fetchNews = async ()=>{
            const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=bdb0bc23abcd6862fa86c6dd380b3cdd`;
            const response = await axios.get(url);
            const fetchedNews = response.data.articles;

            fetchedNews.forEach((article)=>{
                if(!article.image){
                    article.image = noImg;
                }
            })
            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1,7))
            console.log(fetchedNews.slice(1,7))
        }

        fetchNews()
    },[selectedCategory])

    const handleCategoryClick = (e,category)=>{
        e.preventDefault();
        setSelectedCategory(category);
    }

    const handleArticleClick = (article)=>{
        setSelectedArticle(article);
        setShowModal(true)
    }

  return (
    <div className="news-app">
        <div className="news-header">
            <h1 className="logo">News App</h1>
        </div>
        <div className="news-content">
            <nav className="navbar">
                <h1 className="nav-heading">Categories</h1>
                <div className="categories">
                    {categories.map((category, index)=>(
                        <a onClick={(e)=> handleCategoryClick(e,category)} key={index} href="#" className="nav-link">{category}</a>
                    ))}
                </div>
            </nav>
            <div className="news-section">
                {headline && (
                    <div className="headline" onClick={()=> handleArticleClick(headline)}>
                        <img className='img-grid' src={headline.image || noImg} alt={headline.title} />
                        <h2 className='headline-title'>{headline.title}</h2>
                    </div>
                )}
                
                <div className="news-grid">
                    {news.map((article, index)=>(
                       <div onClick={()=> handleArticleClick(article)} className="news-grid-item" key={index}>
                        <img className='img-grid' src={article.image || noImg} alt={article.title} />
                        <h3>{article.title}</h3>
                    </div> 
                    ))}
                    
                </div>
            </div>
            <NewsModal show={showModal} article={selectedArticle} onClose={()=> setShowModal(false)}/>
        </div>
        <footer>
            <p className='copyright'>
                <span>News App</span>
            </p>
            <p>&copy; Souhail boughrioul</p>
        </footer>
    </div>
  )
}

export default News