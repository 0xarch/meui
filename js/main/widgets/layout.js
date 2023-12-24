function resolveGrid(){
    document.querySelectorAll('layout[\\@grid]').forEach((i)=>{
        if(i.getAttribute('col')){
            let col = i.getAttribute('col').split(" ");
            col[1]?void 0: (col.push('auto'));
            i.style.setProperty('--mGridCount',col[0]);
            i.style.setProperty('--mGridType',col[1]);
        }
        if(i.getAttribute('colM')){
            let col = i.getAttribute('colM').split(" ");
            col[1]?void 0: (col.push('auto'));
            i.style.setProperty('--mGridCountM',col[0]);
            i.style.setProperty('--mGridTypeM',col[1]);
        }
        if(i.getAttribute('m-row')){
            i.style.setProperty('grid-template-rows',`${i.getAttribute('row')}`);
        }
    })
}

const Layout = {
    resolveGrid
}

export default Layout;