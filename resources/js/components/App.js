import React from 'react';
import ReactDOM from 'react-dom';
import Forecast from '../pages/forecast';
import {Provider} from "react-redux";
import store from "../redux/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <Forecast/>
            </Provider>
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
