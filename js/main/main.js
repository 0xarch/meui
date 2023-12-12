import Drawer from './components/drawer.js';
import Button from './widgets/button.js';
import darkModeSettings from './browse/darkmodesettings.js';
import windowSettings from './browse/windowsettings.js';
import debounce from './util/debounce.js';

export const MEUI = {
    name: "MEUI",
    version: "0.0.2",
    components: {
        drawer: Drawer,
    },
    widgets: {
        button: Button,
    },
    browse: {
        darkModeSettings: darkModeSettings,
        windowSettings: windowSettings,
    },
    util: {
        debounce: debounce
    }
}

export default MEUI;