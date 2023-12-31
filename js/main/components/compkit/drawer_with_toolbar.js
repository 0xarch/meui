import Drawer from "../drawer.js";

function render_dwt(){
    var drawer = document.querySelector('*[\\@Mr="@c:drawer"]');
    var toolbar = document.querySelector('*[\\@Mr="@c:toolbar"]');
    if(!drawer || !toolbar) return void 0;
    var toolbar_close_drawer_binder = document.createElement('button');
    toolbar_close_drawer_binder.classList.add('mHideinWide');
    toolbar_close_drawer_binder.innerHTML='<icon>menu</icon>';
    Drawer.create(drawer,toolbar_close_drawer_binder);
    if(toolbar.firstChild)
        toolbar.insertBefore(toolbar_close_drawer_binder,toolbar.firstChild);
    else toolbar.appendChild(toolbar_close_drawer_binder);
}

export default render_dwt;