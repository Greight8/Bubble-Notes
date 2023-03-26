import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext';

export default function Alert() {
    const context = useContext(alertContext);
    const { alert, capitalize } = context;

    return (
        <div style={{ height: "50px" }}>
            {alert && <div className={`text-center alert alert-${alert.type}`} role="alert">
                <strong>{capitalize(alert.type)}</strong>{alert.msg}
            </div>}
        </div>
    )
}