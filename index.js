MEUI.browse.windowSettings.detectShrink();
MEUI.browse.darkModeSettings.setMode();
MEUI.browse.darkModeSettings.bindOn();

var drawer = document.querySelector("drawer");
MEUI.components.drawer.create(drawer,document.getElementById('drawer-open'));
MEUI.widgets.layout.resolveGrid();

window.onresize = function(){
    MEUI.browse.windowSettings.debounced.detectShrink();
}