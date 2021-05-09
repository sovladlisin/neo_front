import * as React from 'react';
import { Link } from 'react-router-dom'
import OntologyWS from './Ontology/OntologyWS';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return <>
        <div className='h-menu'>
            <Link to='/resource-library'>Библиотека ресурсов</Link>
            <Link to='/resource-ontology'>Онтология ресурсов</Link>
            <Link to='/domain-ontology'>Онтологии ПрО</Link>
        </div>
    </>
};

export default Home;

