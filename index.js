import MEUI from './js/main/main.js';

var drawer = document.querySelector("Drawer,.ME-Drawer");
MEUI.components.drawer.create(drawer,document.getElementById('drawer-open'));

MEUI.browse.darkModeSettings.setMode();