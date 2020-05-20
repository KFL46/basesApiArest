function reqAj(met, url, idDiv, data, cb) {
    var oReq = new XMLHttpRequest();
    oReq.open(met.toUpperCase(), url, true);
    oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oReq.onprogress = () => {
        document.getElementById(idDiv).innerHTML = "Chargement en cours..."
    }
    oReq.onload = () => {
        cb(oReq, idDiv)
    };
    oReq.send(data);
}

function listeUsers(xhr, div) {
    let madiv = document.getElementById(div)
    let tabUsers = JSON.parse(xhr.responseText)
    madiv.innerHTML = " "
    let uiItems = document.createElement("div")
    uiItems.classList.add("ui")
    uiItems.classList.add("items")


    for (let unUser in tabUsers) {
        uiItems.appendChild(affUnUser(tabUsers[unUser]))
    }
    madiv.appendChild(uiItems)

}
function detUser(xhr, div) {
    let madiv = document.getElementById(div)
    let unUser = JSON.parse(xhr.responseText)

    madiv.innerHTML = " "
    let uiItems = document.createElement("div")
    uiItems.classList.add("ui")
    uiItems.classList.add("items")

    uiItems.appendChild(affUnUser(unUser))
    madiv.appendChild(uiItems)

}

function affUnUser(unUser) {
    let item = document.createElement("div")
    item.classList.add("item")
    let tinyImg = document.createElement("a")
    tinyImg.classList.add("ui")
    tinyImg.classList.add("tiny")
    tinyImg.classList.add("image")
    tinyImg.addEventListener("click", () => {
        reqAj('GET', "http://localhost/basesApirest/users/" + unUser.id, "contener", "", detUser)
    })

    let imgSrc = document.createElement("img")
    imgSrc.src = 'https://semantic-ui.com/images/avatar/large/justen.jpg'
    tinyImg.appendChild(imgSrc)

    let content = document.createElement("div")
    content.classList.add("middle")
    content.classList.add("aligned")
    content.classList.add("content")
    let header = document.createElement("div")
    header.classList.add("header")
    header.innerHTML = unUser.email
    content.appendChild(header)

    let meta = document.createElement("div")
    meta.classList.add("meta")
    let edit = document.createElement('i')
    edit.classList.add("edit")
    edit.classList.add("icon")
    meta.appendChild(edit)
    content.appendChild(meta)

    let supp = document.createElement('i')
    supp.classList.add("eraser")
    supp.classList.add("icon")
    meta.appendChild(supp)

    item.appendChild(tinyImg)
    item.appendChild(content)
    return item
}

function ajxDebug(xhr, div) {
    console.log(xhr)
    document.getElementById(div).innerHTML = "statut : " + xhr.status + " <br/>Réponse :" + xhr.responseText
}


window.addEventListener("load", () => {

    document.getElementById("menLstUt").addEventListener("click", (e) => {
        e.preventDefault()
        reqAj('GET', "http://basesApirest/users", "contener", "", listeUsers)
    })

    reqAj('GET', "http://basesApirest/users", "contener", "", listeUsers)
})