export default {
    toggleActivePanel(panel) {
        let state = require('../store').getState();

        return {
            type: 'SET_ACTIVE_PANEL',
            panel: (state.activePanel === panel ? '' : panel)
        };
    }
}
