import { combineReducers } from 'redux';

import comments from './commments';
import nav from './nav';
import panels from './panels';
import post from './posts';
import projects from './projects';
import subscribers from './subscribers';
import sudoku from './sudoku';
import users from './users';

module.exports = combineReducers({
    comments,
    nav,
    panels,
    post,
    projects,
    subscribers,
    sudoku,
    users
});
