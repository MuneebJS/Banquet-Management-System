import { combineReducers } from 'redux';
import user from './reducer_user';
import goals from './reducer_goals';
import completeGoals from './reducer_completedGoals'

export default combineReducers({
    user,
    goals,
    completeGoals
})
