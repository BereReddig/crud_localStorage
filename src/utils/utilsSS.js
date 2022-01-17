const utilsSS = {
    getItem: (item) => JSON.parse(sessionStorage.getItem(item)),
    setItem: (item, value) => sessionStorage.setItem(item, JSON.stringify(value)),
    //clear: sessionStorage.clear()
}

export default utilsSS;