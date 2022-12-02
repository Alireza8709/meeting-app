import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


import login_reducer from './reducers/login';


const root_reducer = combineReducers<IStore>({
    login: login_reducer,

})

const store = createStore(root_reducer, composeWithDevTools(applyMiddleware(thunk)));


export default store;


