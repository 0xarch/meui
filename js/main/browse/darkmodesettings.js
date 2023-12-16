const GlobalDarkModeMatchMedia = matchMedia('(prefers-color-scheme:dark)');
const Events = [];

function registerEvent(fn){
    Events.push(fn);
    return Events.length;
}

function removeEvent(i){
    return Events.splice(i,i);
}

function bindDarkMode(button){
    var icon = document.createElement('span');
    var text = document.createElement('span');
    button.appendChild(icon);
    button.appendChild(text);
    icon.classList.add('google-symbols');
    text.classList.add('hide-on-wide');
    function changeText(){
        if(darkModeSettings.bodyIsDarkMode()){
            icon.textContent = 'light_mode';
            text.textContent = '切换至浅色模式';
        }else{
            icon.textContent = 'dark_mode';
            text.textContent = '切换至暗色模式';
        }
    }
    button.onclick = function(){
        if(darkModeSettings.bodyIsDarkMode()){
            darkModeSettings.setMode('light');
        }else{
            darkModeSettings.setMode('dark');
        }
        changeText();
    }
    changeText();
    registerEvent(changeText);
}

const darkModeSettings = {
    darkModeMatchMedia: matchMedia('(prefers-color-scheme:dark)'),
    isDarkMode: function(){
        return this.darkModeMatchMedia.matches
    },
    bodyIsDarkMode: function(){
        return document.body.classList.contains('dark');
    },
    getMode: function (){
        if(darkModeSettings.isDarkMode){
            return 'dark';
        }else return 'light';
    },
    prefers: function(mode){
        return darkModeSettings.getMode() == mode;
    },
    setMode: function(mode='default'){
        if(mode=='default' || mode=='auto'){
            if(darkModeSettings.isDarkMode()){
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            }else{
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        }else{
            if(mode=='dark'){
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            }else if(mode=='light'){
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        }
    },
    /**
     * 
     * @param { HTMLElement } button 
     */
    bindDarkMode,
    bindOn: function(){
        GlobalDarkModeMatchMedia.onchange = function(){
            darkModeSettings.setMode();
            Events.forEach((fn)=>{
                console.log(darkModeSettings.bodyIsDarkMode(),fn);
                fn();
            })
        }
    },
    event: {
        Events,
        registerEvent,
        removeEvent
    }
}

export default darkModeSettings;