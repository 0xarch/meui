MEUI.window.layoutManager.detectShrink();
MEUI.window.darkManager.setMode();
MEUI.window.darkManager.bindOn();

// var drawer = document.querySelector("drawer");
// MEUI.components.drawer.create(drawer,document.getElementById('drawer-open'));
MEUI.widgets.layout.resolveGrid();

MEUI.compkits.dwt();

window.onresize = function(){
    MEUI.browse.windowSettings.debounced.detectShrink();
}