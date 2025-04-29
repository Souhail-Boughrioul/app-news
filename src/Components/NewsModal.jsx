import React from 'react'
import demoImg from '../assets/images/news.jpg'
import './NewsModal.css'

const NewsModal = ({show,onClose,article}) => {
    if(!show){
        return
    }
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span onClick={onClose} className='close-button'>
                <i className='fa-solid fa-xmark'></i>
            </span>

            {article && (
                <>
                    <img className='modal-image' src={article.image} alt={article.title} />
                    <h2 className='modal-title'>{article.title}</h2>
                    <p className='modal-source'>{article.source.name}</p>
                    <p className='modal-date'>{new Date(article.publishedAt).toLocaleString(
                        'en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }
                    )}</p>
                    <p className='modal-content-text'>{article.content}</p>
                    <a href={article.url} target='_blank' rel='noopener noreferrer' className='read-more-link'>Read More</a>   
                </>
            )}
            
        </div>
    </div>
  )
}

export default NewsModal