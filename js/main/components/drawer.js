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
        if(child.classList.contains('_prop_subMenuer')){
            child.onclick = function(){
                openChildMenu(child);
            }
            let child_close = child.querySelector("._prop_closing");
            if(child_close !== undefined){
                child_close.onclick = function(e){
                    e.stopPropagation();
                    closeChildMenu(child);
                }
            }
        }else continue;
    }
}

function createLink(conf){
    var link = Button.button.create(conf.icon,conf.text,conf.href,['_in_drawerComponent','_prop_item']);
    if(location.pathname == conf.href) link.classList.add('_prop_highlight');
    return link;
}

function createSubdrop(text,children,css_class,holder_class){
    let menu = document.createElement('div');
    let menu_child_holder = document.createElement('div');
    menu.innerHTML+=`<span>${text}</span>`;
    if(css_class instanceof Array) menu.classList.add(...css_class);
    else menu.classList.add(css_class);
    if(holder_class instanceof Array) menu_child_holder.classList.add(...holder_class);
    else menu_child_holder.classList.add(holder_class);
    for(let child of children){
        menu_child_holder.appendChild(child);
    }
    menu.appendChild(menu_child_holder);
    menu.style.setProperty('--sHeight','calc(var(--itemHeight) + '+(64*children.length)+'px)');
    return menu;
}

function generateChildMenu(conf){
    var elem = document.createElement('div');
    elem.innerHTML += `<icon>${conf.icon}</icon><span>${conf.text}</span>`;
    var childmenu = document.createElement('div');
    var childclose = Button.button.create('arrow_back','返回',void 0,['_prop_closing','_in_drawerComponent','_prop_item','_override_style']);
    elem.classList.add('_in_drawerComponent','_prop_item','_prop_subMenuer');
    childmenu.classList.add('_in_drawerComponent','_prop_subMenus');
    childmenu.appendChild(childclose);
    for(let child_conf of conf.child){
        if(child_conf.type == 'menu'){
            let children = [];
            for(let sub_child of child_conf.child){
                var sub_elem = Button.button.create(sub_child.icon,sub_child.text,sub_child.href,['_in_drawerComponent','_prop_item','_override_style']);
                children.push(sub_elem);
            }
            let menu = createSubdrop(child_conf.text,children,['_in_drawerComponent','_prop_item','_prop_subDropper'],['_in_drawerComponent','_prop_subDropped']);
            childmenu.appendChild(menu);
        } else {
            childmenu.appendChild(createLink(child_conf));
        }
    }
    elem.appendChild(childmenu);
    return elem;
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
        hide_div.classList.add('_in_drawerComponent','_prop_mostBackward');
        hide_div.appendChild(hide_button);
        drawer_with_json.appendChild(hide_div);
    }
    var section = document.createElement('section');
    for(let item of config.section){
        if(item.type == 'menu'){
            section.appendChild(generateChildMenu(item));
        }else{
            section.appendChild(createLink(item));
        }
    }
    drawer_with_json.appendChild(section);
    if(config.darkSwitcher){
        var dark_div = document.createElement('div');
        var dark_button = document.createElement('button');
        dark_button.classList.add('switch-button');
        dark_div.classList.add('darkSwitcher');
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