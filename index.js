import MEUI from './js/main/main.js';

var drawer = document.querySelector("Drawer,.ME-Drawer");

MEUI.components.drawer.create(drawer);
MEUI.components.drawer.bind.open(document.getElementById('drawer-open'),drawer);
MEUI.components.drawer.bind.close(document.getElementById('drawer-close'),drawer);
MEUI.components.drawer.resolveChildMenu(drawer);

MEUI.browse.darkModeSettings.setMode();
MEUI.browse.darkModeSettings.bindDarkMode(document.getElementById('switch-dark'));