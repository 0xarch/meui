import debounce from "../util/debounce.js";

var tolerance = 0.975;

function getAspectRatio(){
    return window.innerWidth / window.innerHeight;
}

function detectShrink(){
    if(getAspectRatio() < windowSettings.tolerance){
        document.body.setAttribute("shrink","true");
        document.body.setAttribute('m-layout','narrow');
    }else{
        document.body.setAttribute("shrink","false");
        document.body.setAttribute('m-layout','wide');
    }
}

const windowSettings = {
    userAgent: navigator.userAgent,
    aspectRatio: getAspectRatio,
    detectShrink: detectShrink,
    tolerance,
    debounced: {
        detectShrink: debounce(detectShrink,800)
    }
}

export default windowSettings;