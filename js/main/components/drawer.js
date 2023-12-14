import Button from '../widgets/button.js';
import darkModeSettings from '../browse/darkmodesettings.js';

const shadow = document.createElement('div');
shadow.classList.add('drawer-shadow');
/**
 * 
 * @param { HTMLElement } drawer 
 */
async function initDrawer(drawer) {
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

async function bindDrawerOpen(button,drawer){
    button.onclick = function(){
        drawer.setAttribute("open",true);
        shadow.classList.add('shown');
    }
}

async function bindDrawerClose(button,drawer){
    button.onclick = function(){
        drawer.setAttribute("open",false);
        shadow.classList.remove('shown');
    }
}

/**
 * 
 * @param {HTMLElement} drawer 
 */
async function resolveChildMenu(drawer){
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
async function create(drawer_with_json,open_button){
    const config = JSON.parse(drawer_with_json.innerHTML);
    drawer_with_json.innerHTML = '';
    if(open_button){
        bindDrawerOpen(open_button,drawer_with_json);
    }
    // start compile
    drawer_with_json.setAttribute('open',config.open);
    if(config.hideButton){
        var hide_div = document.createElement('div');
        var hide_button = Button.iconButton.create('menu_open');
        bindDrawerClose(hide_button,drawer_with_json);
        hide_div.classList.add('me-div-goback');
        hide_div.appendChild(hide_button);
        drawer_with_json.appendChild(hide_div);
    }
    var section = document.createElement('section');
    for(let item of config.section){
        if(item.type == 'menu'){
            var elem = document.createElement('ul');
            var icon = document.createElement('icon');
            var text = document.createElement('span');
            var childmenu = document.createElement('child-menu');
            var childclose = Button.button.create('arrow_back','返回',void 0,['drawer-item','child-close','mId0-ci']);
            icon.textContent = item.icon;
            text.textContent = item.text;
            elem.classList.add('drawer-item','mId0-c');
            childmenu.appendChild(childclose);
            for(let child of item.child){
                let elem = void 0;
                let icon = document.createElement('icon');
                let text = document.createElement('span');
                icon.textContent = child.icon;
                text.textContent = child.text;
                if(child.type == 'menu'){
                    elem = document.createElement('ul');
                    elem.classList.add('has-sub-drop');
                    let sub_childmenu = document.createElement('child-drop');
                    for(let sub_child of child.child){
                        var sub_elem = Button.button.create(sub_child.icon,sub_child.text,sub_child.href,'drawer-item');
                        sub_childmenu.appendChild(sub_elem);
                    }
                    elem.appendChild(text);
                    elem.appendChild(sub_childmenu);
                    elem.style.setProperty('--sHeight','calc(64px + '+child.child.length+'*80px)');
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
            var elem = Button.button.create(item.icon,item.text,item.href,['drawer-item','mId0-c']);
            if(location.pathname == item.href) elem.classList.add('mId0-hl');
            console.log(location.pathname,item.href);
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