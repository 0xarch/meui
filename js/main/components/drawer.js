const shadow = document.createElement('div');
shadow.classList.add('drawer-shadow');
/**
 * 
 * @param { HTMLElement } drawer 
 */
function createDrawer(drawer) {
    shadow.onclick = function (e) {
        if (e.target == shadow)
            if (drawer.getAttribute("open") == "true") {
                drawer.setAttribute("open", false);
                shadow.classList.remove('shown');
            }
    }
    if (drawer.getAttribute("open") == undefined) {
        drawer.setAttribute("open", "false");
    }
    document.body.appendChild(shadow);
}

function bindDrawerOpen(button,drawer){
    button.onclick = function(){
        drawer.setAttribute("open",true);
        shadow.classList.add('shown');
    }
}

function bindDrawerClose(button,drawer){
    button.onclick = function(){
        drawer.setAttribute("open",false);
        shadow.classList.remove('shown');
    }
}

/**
 * 
 * @param {HTMLElement} drawer 
 */
function resolveChildMenu(drawer){
    function openChildMenu(child){
        drawer.setAttribute("child-open","true");
        child.setAttribute("open-menu","true");
    }
    function closeChildMenu(child){
        drawer.setAttribute("child-open","false");
        child.removeAttribute("open-menu");
    }
    const section = drawer.querySelector("section");
    for(let child of section.children){
        if(child.tagName == 'UL'){
            child.onclick = function(){
                openChildMenu(child);
            }
            let child_close = child.querySelector(".child-close");
            if(child_close !== undefined){
                child_close.onclick = function(e){
                    e.stopPropagation();
                    closeChildMenu(child);
                }
            }
        }else continue;
    }
}

const Drawer = {
    create: createDrawer,
    bind: {
        open: bindDrawerOpen,
        close: bindDrawerClose,
    },
    resolveChildMenu: resolveChildMenu,
}

export default Drawer;