import * as React from 'react';
import { NEWS_1 } from '../utils';
import { Link } from 'react-router-dom'
interface INewsProps {
}

const News: React.FunctionComponent<INewsProps> = (props) => {
    return <>
        <div className='sub-page-container'>
            <p className='sub-page-title'>Новости</p>

            <div className='news-container'>
                <div className='news-item'>
                    <img src={NEWS_1}></img>
                    <div className='news-item-meta'>
                        <label>{'28.07.2021'}</label>
                        <p className='news-item-meta-title'>
                            Кто такие теленгиты и зачем им топшур? Исчезающие народы России
                        </p>
                        <p className='news-temp-meta-summary'>
                            На земле осталось всего около четырех тысяч теленгитов — древнего тюркского народа. Долгое время теленгиты считались субэтнической группой алтайцев и лишь во время ...
                        </p>
                    </div>
                    <Link to='/news/1'><i className="fas fa-external-link-alt"></i></Link>
                </div>
            </div>
        </div>
    </>;
};

export default News;
