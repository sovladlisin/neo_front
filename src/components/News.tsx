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
                        <label>{'05.02.2022'}</label>
                        <p className='news-item-meta-title'>
                            Заработала новая версия портала «Фольклор народов Сибири»
                        </p>
                        <p className='news-temp-meta-summary'>
                            В рамках работы по гранту Правительства РФ для государственной поддержки научных исследований, проводимых ...
                        </p>
                    </div>
                    <Link to='/news/1'><i className="fas fa-external-link-alt"></i></Link>
                </div>
            </div>
        </div>
    </>;
};

export default News;
