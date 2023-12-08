import Drawer from './components/drawer.js';
import darkModeSettings from './browse/darkmodesettings.js';

export const MEUI = {
    name: "MEUI",
    version: "0.0.1",
    components: {
        drawer: Drawer
    },
    browse: {
        darkModeSettings: darkModeSettings
    }
}

export default MEUI;