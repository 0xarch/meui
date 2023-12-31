MEUI.window.layoutManager.tolerance=2;
MEUI.window.layoutManager.detectShrink();
MEUI.window.darkManager.setMode();
MEUI.window.darkManager.bindOn();


MEUI.widgets.layout.resolveGrid();

MEUI.compkits.dwt();

window.onresize = function(){
    MEUI.browse.windowSettings.debounced.detectShrink();
}