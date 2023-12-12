import MEUI from './js/main/main.js';

var drawer = document.querySelector("drawer");
MEUI.components.drawer.create(drawer,document.getElementById('drawer-open'));
MEUI.browse.windowSettings.detectShrink();
MEUI.browse.darkModeSettings.setMode();

const detectShrink = MEUI.util.debounce(MEUI.browse.windowSettings.detectShrink,600);

window.onresize = function(){
    detectShrink();
}