import { combineReducers } from 'redux';

import classifier from './classifier';
import comments from './comments';
import nav from './nav';
import panels from './panels';
import posts from './posts';
import projects from './projects';
import subscribers from './subscribers';
import sudoku from './sudoku';
import users from './users';

module.exports = combineReducers({
    classifier,
    comments,
    nav,
    panels,
    posts,
    projects,
    subscribers,
    sudoku,
    users
});
