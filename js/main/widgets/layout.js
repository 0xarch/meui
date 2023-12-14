function resolveGrid(){
    document.querySelectorAll('layout[grid]').forEach((i)=>{
        if(i.getAttribute('col')){
            let col = i.getAttribute('col').split(" ");
            col[1]?void 0: (col.push('auto'));
            i.style.setProperty('grid-template-columns',`repeat(${col[0]},${col[1]})`);
        }
        if(i.getAttribute('row')){
            i.style.setProperty('grid-template-rows',`${i.getAttribute('row')}`);
        }
    })
}

const Layout = {
    resolveGrid
}

export default Layout;