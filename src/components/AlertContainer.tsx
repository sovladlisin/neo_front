import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts } from '../actions/alerts/alerts';
import { TAlert } from '../actions/alerts/types';
import { RootStore } from '../store';
import { useOnClickOutside } from './HandleClickOutside';
import Logo from '../static/images/logo-mini.png'

interface IAlertContainerProps {
}

const AlertContainer: React.FunctionComponent<IAlertContainerProps> = (props) => {
    const dispatch = useDispatch()

    const alertState = useSelector((state: RootStore) => state.alerts)

    const ref = React.useRef()
    useOnClickOutside(ref, () => {
        dispatch(clearAlerts())
    })


    return <>
        {alertState.alerts && <>
            <div ref={ref} className='alert-container'>

                <div className='alert-meat'>
                    <img src={Logo}></img>
                    <p>{alertState.alerts.message}</p>
                </div>

            </div>
        </>}
    </>;
};

export default AlertContainer;
