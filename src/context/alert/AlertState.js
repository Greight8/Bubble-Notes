import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    // 2) to set alert message
    const [alert, setAlert] = useState(null);

    // here type means success, danger etc these are alert classes in bootstrap
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    // making func to capitalize 1st letter of Alert type
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert, capitalize }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
