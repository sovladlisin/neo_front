import * as React from 'react';
import { NEWS_1 } from '../utils';
import { Link } from 'react-router-dom'
interface INewsItemProps {
}

const NewsItem: React.FunctionComponent<INewsItemProps> = (props) => {
    return <>
        <div className='sub-page-container'>
            <Link to='/news' className='workspace-return'><i className='fas fa-long-arrow-alt-left'></i>К списку новостей</Link>
            <div className='news-item-page-container'>
                <p className='news-item-page-date'>05.02.2022</p>
                <p className='news-item-page-title'>Заработала новая версия портала «Фольклор народов Сибири»</p>
                <p className='news-item-page-paragraph'>В рамках работы по гранту Правительства РФ для государственной поддержки научных исследований, проводимых под руководством ведущих ученых (соглашение № 075-15-2019-1884) создана новая версия портала «Фольклор народов Сибири».</p>
                <p className='news-item-page-paragraph'>В отличие от старой версии, новая база данных представлена в графах. За основу взят стандарт <a href={'https://www.iso.org/standard/57832.html'}>ISO CIDOC-CRM</a> (CIDOC Conceptual Reference Model) — формальная модель, созданная для поддержки интеграции, стандартизации и обмена информацией в области культурного наследия. </p>
                <p className='news-item-page-paragraph'>Старая версия портала доступна по ссылке <a href={'https://folk-old.philology.nsc.ru/'}>https://folk-old.philology.nsc.ru/</a>. На новом портале публикуются материалы, подготовленные в 2021 году. Материалы, опубликованные ранее, хранящиеся в старой версии, будут переноситься в новую базу данных постепенно.</p>
            </div>
        </div>
    </>;
};

export default NewsItem;
