import darkModeSettings from "../browse/darkmodesettings.js";

const shadow = document.createElement('div');
shadow.classList.add('drawer-shadow');
/**
 * 
 * @param { HTMLElement } drawer 
 */
function initDrawer(drawer) {
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
    resolveChildMenu(drawer);
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

/**
 * 
 * @param { HTMLElement } drawer_with_json
 * @param { HTMLElement | undefined } open_button
 */
function create(drawer_with_json,open_button){
    const config = JSON.parse(drawer_with_json.innerHTML);
    drawer_with_json.innerHTML = '';
    if(open_button){
        bindDrawerOpen(open_button,drawer_with_json);
    }
    // start compile
    drawer_with_json.setAttribute('open',config.open);
    if(config.hideButton){
        var hide_div = document.createElement('goback');
        var hide_button = document.createElement('button');
        hide_button.classList.add('icon-button','google-symbols');
        hide_button.textContent = 'menu_open';
        bindDrawerClose(hide_button,drawer_with_json);
        hide_div.appendChild(hide_button);
        drawer_with_json.appendChild(hide_div);
    }
    var section = document.createElement('section');
    for(let item of config.section){
        if(item.type == 'menu'){
            var elem = document.createElement('ul');
            var icon = document.createElement('icon');
            var text = document.createElement('span');
            var childmenu = document.createElement('childmenu');
            var childclose = document.createElement('button');
            var closeicon = document.createElement('icon');
            var closetext = document.createElement('span');
            icon.textContent = item.icon;
            text.textContent = item.text;
            closeicon.textContent = 'arrow_back';
            closetext.textContent = '返回';
            elem.classList.add('drawer-item');
            childclose.classList.add('drawer-item','child-close');
            childclose.appendChild(closeicon);
            childclose.appendChild(closetext);
            childmenu.appendChild(childclose);
            for(let child of item.child){
                let elem;
                // let elem = document.createElement('a');
                let icon = document.createElement('icon');
                let text = document.createElement('span');
                icon.textContent = child.icon;
                text.textContent = child.text;
                if(child.type == 'menu'){
                    elem = document.createElement('ul');
                    elem.classList.add('has-sub-drop');
                    let sub_childmenu = document.createElement('child-drop');
                    for(let sub_child of child.child){
                        let sub_elem = document.createElement('a');
                        let icon = document.createElement('icon');
                        let text = document.createElement('span');
                        icon.textContent = sub_child.icon;
                        text.textContent = sub_child.text;
                        if(sub_child.href) sub_elem.href = sub_child.href;
                        sub_elem.classList.add('drawer-item');
                        sub_elem.appendChild(icon);
                        sub_elem.appendChild(text);
                        sub_childmenu.appendChild(sub_elem);
                    }
                    elem.appendChild(text);
                    elem.appendChild(sub_childmenu);
                    elem.style.setProperty('--sHeight','calc(var(--s64px) + '+child.child.length+'*var(--s80px))');
                }else{
                    elem = document.createElement('a');
                    elem.href = child.href;
                    elem.appendChild(icon);
                    elem.appendChild(text);
                }
                elem.classList.add('drawer-item');
                childmenu.appendChild(elem);
            }
            elem.appendChild(icon);
            elem.appendChild(text);
            elem.appendChild(childmenu);
            section.appendChild(elem);
        }else{
            var elem = document.createElement('a');
            var icon = document.createElement('icon');
            var text = document.createElement('span');
            elem.classList.add('drawer-item');
            if(item.href) elem.href = item.href;
            icon.textContent = item.icon;
            text.textContent = item.text;
            elem.appendChild(icon);
            elem.appendChild(text);
            section.appendChild(elem);
        }
    }
    drawer_with_json.appendChild(section);
    if(config.darkSwitcher){
        var dark_div = document.createElement('div');
        var dark_button = document.createElement('button');
        dark_button.classList.add('switch-button');
        dark_div.classList.add('flex-center-all');
        darkModeSettings.bindDarkMode(dark_button);
        dark_div.appendChild(dark_button);
        drawer_with_json.appendChild(dark_div);
    }
    initDrawer(drawer_with_json);
}

const Drawer = {
    init: initDrawer,
    create: create,
    bind: {
        open: bindDrawerOpen,
        close: bindDrawerClose,
    },
    resolveChildMenu: resolveChildMenu,
}

export default Drawer;