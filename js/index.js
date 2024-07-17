window.onload = () => {
    document.querySelector('button').onclick = () => {
        Game.init()
        document.querySelector('#startPage').style.display = "none"
    }
}



//TODO: When it's GAME OVER reloadpagejavascript
