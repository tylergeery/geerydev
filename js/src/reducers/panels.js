import actions from '../actions/constants';

let initialState = {
    activePanel: '',
    panelFilters: [
        {
            active: false,
            name: 'Comments',
            value: 'comments'
        },
        {
            active: true,
            name: 'Recent',
            value: 'created'
        },
        {
            active: false,
            name: 'Mystery',
            value: 'mystery'
        }
    ]
};

export default function panels(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.panelSetActive:
            newState.activePanel = action.panel;

            return newState;
    }

    return state;
};
