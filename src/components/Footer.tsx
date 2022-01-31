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

                <p className='footer-email'>sib.folklore@gmail.com</p>
            </div>
        </div>
        <div className='footer-legal-container'>
            <p className='footer-legal'>
                Все права защищены. Использование материалов сайта разрешается только с письменного
                согласия администрации Портала и размещения ссылки на источник. Любые нарушения
                будут выявляться и преследоваться согласно законодательству (статья 146 Уголовного
                кодекса Российской Федерации «Нарушение авторских и смежных прав», статья 7.12
                Кодекса Российской Федерации об административных правонарушениях «Нарушение
                авторских и смежных прав, изобретательских и патентных прав»)
            </p>

        </div>
    </>;
};

export default Footer;
