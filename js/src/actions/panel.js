export default {
    toggleActivePanel(panel) {
        let state = require('../store').default.getState();

        return {
            type: 'SET_ACTIVE_PANEL',
            panel: (state.panels.activePanel === panel ? '' : panel)
        };
    }
};
