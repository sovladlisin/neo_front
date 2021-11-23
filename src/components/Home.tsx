import * as React from 'react';
import { Link } from 'react-router-dom'
import { CORPUS_1, HOME_1 } from '../utils';
import Footer from './Footer';
import OntologyWS from './Ontology/OntologyWS';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return <>
        <>
            <div className='home-container'>
                <div className='home-card'>
                    <div className='home-card-inner'>
                        <p>Фольклорные произведения коренных народов Сибири</p>
                        <div className='home-card-info'>
                            <div className='home-card-text'>
                                <p>Портал «Фольклор народов Сибири» обеспечивает доступ к редким фольклорным текстам и ресурсам народов Сибири и Дальнего Востока.</p>
                                <Link to='/about'>ПОДРОБНЕЕ</Link>
                            </div>
                            <img src={HOME_1}></img>
                        </div>
                    </div>
                </div>


                <div className='home-block'>
                    <div className='home-block-inner'>
                        <p>Корпусы</p>
                        <div className='home-corpuses-container'>
                            {[1, 1, 1, 1, 1, 1, 1, 1].map(i => {
                                return <div className='home-corpus-block'>
                                    <img src={CORPUS_1}></img>
                                    <p>Алтайский</p>
                                    <div className='home-coprus-meta'>
                                        <p>10 текстов</p>
                                        <p>5 ресурсов</p>
                                    </div>
                                    <div className='home-corpus-image-backdrop'></div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>


                <div className='home-block home-block-gray'>
                    <div className='home-block-inner'>
                        <p>Ресурсы</p>
                        <div className='home-resourse-container'>
                            <div className='home-resourse-block'>
                                <p>Т</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Тексты</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                            <div className='home-resourse-block'>
                                <p>А</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Аудио</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                            <div className='home-resourse-block'>
                                <p>В</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Видео</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                            <div className='home-resourse-block'>
                                <p>П</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Публикации</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                            <div className='home-resourse-block'>
                                <p>Г</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Глоссы</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                            <div className='home-resourse-block'>
                                <p>Ф</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Фото</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                            <div className='home-resourse-block'>
                                <p>Н</p>
                                <div className='home-resourse-meta'>
                                    <p className='home-resourse-title'>Нотировки</p>
                                    <p>5 ресурсов</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='home-block'>
                    <div className='home-block-inner'>
                        <p>Новости</p>
                    </div>
                </div>

            </div>


            {/* <div className="info">
                <p>Электронный портал «Фольклор народов Сибири» - фундаментальный постоянно действующий проект, работа по которому ведется
                    коллективом сотрудников двух институтов Сибирского отделения Российской академии наук: <a target="_blank" href="http://www.philology.nsc.ru"> Института филологии (ИФЛ СО РАН)</a>, и Института систем информатики имени А.П. Ершова (ссылка).</p>
                <p> Разработка портала проведена при финансовой поддержке Российского гуманитарного научного фонда (2014-2016 гг.,
                    проект №14-04-12010 Электронный ресурс «Фольклор народов Сибири»: текстовое, семантическое и мультимедийное
                    представление»).</p>
                <p> С 2019 года идет формирование новых подкорпусов портала, пополнение его новыми фольклоными материалами.
                    Работы ведутся в рамках выполнения проекта Института филологии СО РАН «Культурные универсалии вербальных традиций
                    народов Сибири и Дальнего Востока: фольклор, литература, язык» по гранту Правительства РФ для государственной поддержки
                    научных исследований, проводимых под руководством ведущих ученых (соглашение № 075-15-2019-1884).</p>
                <p>Для просмотра фольклорных текстов нажмите БИБЛИОТЕКА РЕСУРСОВ.</p>
            </div> */}
        </>
    </>
};

export default Home;

