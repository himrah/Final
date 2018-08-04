import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './connection'
import {ApolloProvider} from 'react-apollo'
import Loading from './loading'
import Loadable from 'react-loadable'
import registerServiceWorker from './registerServiceWorker';
import './components/in.css';
const AAp = Loadable({
    loader:()=>import('./App'),
    loading:Loading
})

ReactDOM.render((
<ApolloProvider client={client}>
<AAp />
</ApolloProvider>
),
document.getElementById('root'));
registerServiceWorker();
