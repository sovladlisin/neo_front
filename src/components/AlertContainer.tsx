import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts } from '../actions/alerts/alerts';
import { TAlert } from '../actions/alerts/types';
import { RootStore } from '../store';
import { useOnClickOutside } from './HandleClickOutside';

interface IAlertContainerProps {
}

const AlertContainer: React.FunctionComponent<IAlertContainerProps> = (props) => {
    const dispatch = useDispatch()

    const alertState = useSelector((state: RootStore) => state.alerts)

    const ref = React.useRef()
    useOnClickOutside(ref, () => {
        dispatch(clearAlerts())
    })

    const getStyle = (alert: TAlert) => {
        switch (alert.type) {
            case 500:
                return { background: '#E95678E6' }

            case 200:
                return { background: '#20967c' }

            case 403:
                return { background: '#ff4902e6' }

            case 401:
                return { background: '#ff4902e6' }

            default:
                return { background: '#E95678E6' }
        }
    }
    return <>
        <div ref={ref} className='alert-container'>
            {alertState.alerts.length != 0 && alertState.alerts.map(alert => {
                return (
                    <p style={getStyle(alert)}>
                        {alert.message}
                    </p>
                )
            })}
        </div>
    </>;
};

export default AlertContainer;
