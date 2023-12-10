import Drawer from './components/drawer.js';
import darkModeSettings from './browse/darkmodesettings.js';
import windowSettings from './browse/windowsettings.js';

export const MEUI = {
    name: "MEUI",
    version: "0.0.1",
    components: {
        drawer: Drawer
    },
    browse: {
        darkModeSettings: darkModeSettings,
        windowSettings: windowSettings,
    }
}

export default MEUI;