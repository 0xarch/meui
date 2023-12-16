import debounce from "../util/debounce.js";

function getAspectRatio(){
    return window.innerWidth / window.innerHeight;
}

function detectShrink(){
    if(getAspectRatio() < 1.5){
        document.body.setAttribute("shrink","true");
        document.body.setAttribute('m-device','mob');
    }else{
        document.body.setAttribute("shrink","false");
        document.body.setAttribute('m-device','pc');
    }
}

const windowSettings = {
    userAgent: navigator.userAgent,
    aspectRatio: getAspectRatio,
    detectShrink: detectShrink,
    debounced: {
        detectShrink: debounce(detectShrink,800)
    }
}

export default windowSettings;