import { combineReducers } from 'redux'

import events from "./eventReducer"

import EventsReducer from './eventsReducer'
import ModalsReducer from './modalsReducer'
import SearchReducer from './searchReducer'

export default combineReducers({
    event: EventsReducer,
    modal: ModalsReducer,
    search: SearchReducer,
    events: events
})