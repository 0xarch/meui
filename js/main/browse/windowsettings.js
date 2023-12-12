const windowSettings = {
    userAgent: navigator.userAgent,
    aspectRatio: function(){
        return window.innerWidth / window.innerHeight;
    },
    detectShrink: function(){
        if(windowSettings.aspectRatio() < 2.0){
            document.body.setAttribute("shrink","true");
        }else{
            document.body.setAttribute("shrink","false");
        }
    }
}

export default windowSettings;