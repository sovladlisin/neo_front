import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/App'

//css
import './src/static/css/fixer.css'
import './src/static/css/ontology.css'
import './src/static/css/home.css'
import './src/static/css/forms.css'
import './src/static/css/header.css'
import './src/static/css/account.css'
import './src/static/css/workspace.css'
import './src/static/css/alerts.css'

import './src/static/newcss/header.css'
import './src/static/newcss/home.css'
import './src/static/newcss/corpuses.css'
import './src/static/newcss/footer.css'
import './src/static/newcss/actors.css'
import './src/static/newcss/domain-ontology.css'
import './src/static/newcss/corpus-view.css'
import './src/static/newcss/about.css'
import './src/static/newcss/resources.css'
import './src/static/newcss/image-card.css'
import './src/static/newcss/news.css'
import './src/static/newcss/cabinet.css'
import './src/static/newcss/text-upload-form.css'

import '@fortawesome/fontawesome-free/css/all.min.css';



import { persistStore } from 'redux-persist'
import store from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.querySelector('#root')
)

