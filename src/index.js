import './style/index.scss';
import App from './components/app';
import store from './store/store';

import 'preact/debug';
import 'preact/devtools';
import { Provider } from 'react-redux';

const Application = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Application;

