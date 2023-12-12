import Drawer from './components/drawer.js';
import darkModeSettings from './browse/darkmodesettings.js';
import windowSettings from './browse/windowsettings.js';
import Button from './components/button.js';
import debounce from './util/debounce.js';

export const MEUI = {
    name: "MEUI",
    version: "0.0.1",
    components: {
        drawer: Drawer,
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