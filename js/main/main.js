import Drawer from './components/drawer.js';
import Button from './widgets/button.js';
import Layout from './widgets/layout.js';
import darkModeSettings from './browse/darkmodesettings.js';
import windowSettings from './browse/windowsettings.js';
import debounce from './util/debounce.js';
import render_dwt from './components/compkit/drawer_with_toolbar.js';

export const MEUI = {
    name: "MEUI",
    version: "0.0.2",
    components: {
        drawer: Drawer,
    },
    compkits: {
        dwt: render_dwt,
    },
    widgets: {
        button: Button,
        layout: Layout,
    },
    window: {
        darkManager: darkModeSettings,
        layoutManager: windowSettings,
    },
    browse: {
        darkModeSettings: darkModeSettings,
        windowSettings: windowSettings,
    },
    util: {
        debounce: debounce
    }
}

if(window) window.MEUI = MEUI;
