import * as React from 'react';
import { LOGO2 } from '../utils';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return <>
        <div className='footer-container'>
            <div className='footer-inner'>
                <img src={LOGO2}></img>
                <p>Портал «Фольклор народов Сибири»</p>
                <p className='footer-email'>folklor_portal@gmail.com</p>
            </div>
        </div>
    </>;
};

export default Footer;
