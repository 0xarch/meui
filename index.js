var drawer = document.querySelector("drawer");
MEUI.components.drawer.create(drawer,document.getElementById('drawer-open'));
MEUI.widgets.layout.resolveGrid();

MEUI.browse.windowSettings.detectShrink();
MEUI.browse.darkModeSettings.setMode();

window.onresize = function(){
    MEUI.browse.windowSettings.debounced.detectShrink();
}