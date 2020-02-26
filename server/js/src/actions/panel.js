import actions from './constants';

export default {
    toggleActivePanel(panel) {
        let state = require('../store').default.getState();

        return {
            type: actions.panelSetActive,
            panel: (state.panels.activePanel === panel ? '' : panel)
        };
    }
};
