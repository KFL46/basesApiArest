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
    header.innerHTML = unUser.utilisateur
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
        reqAj('GET', "http://localhost/basesApirest/users", "contener", "", listeUsers)
    })

    reqAj('GET', "http://localhost/basesApirest/users", "contener", "", listeUsers)
})


//---------------------------enregistrement de l'utilisateur ----------------------------------//


function affFormNewUser() {
    document.getElementById("contener").innerHTML = " "
    let monForm = document.createElement("form")
    monForm.classList.add("ui")
    monForm.classList.add("form")
    let tabInput = [
        {
            label: "Adresse e-mail",
            type: "text",
            id: "mailUser",
            value: ""
        }, {
            label: "Mot de passe",
            type: "password",
            id: "passwdUser",
            value: ""
        }, {
            label: "Confirmez le mot de passe",
            type: "password",
            id: "confirmPasswd",
            value: ""
        }
    ]
    creerChampForm(monForm, tabInput)

    let monBout = document.createElement("button")
    monBout.classList.add("ui")
    monBout.classList.add("button")
    monBout.innerHTML = "Enregistrez vous"
    monForm.appendChild(monBout)

    document.getElementById("contener").appendChild(monForm)

}
function creerChampForm(unForm, tabChamps) {
    for (unChamp of tabChamps) {
        let monCont = document.createElement("div")
        monCont.classList.add("field")

        let monLab = document.createElement("label")
        monLab.innerHTML = unChamp.label
        monCont.appendChild(monLab)

        let monInput = document.createElement('input')
        if (unChamp.type == "readonly") {
            monInput.type = "text"
            monInput.readonly = "readonly"
        }
        else {
            monInput.type = unChamp.type
        }
        monInput.id = unChamp.id
        monInput.value = unChamp.value
        monCont.appendChild(monInput)

        unForm.appendChild(monCont)
    }

}
window.addEventListener("load", () => {

    document.getElementById("menInscUt").addEventListener("click", (e) => {
        e.preventDefault()
        affFormNewUser()
        reqAj('GET', "http://localhost/basesApirest/users", "contener", "", listeUsers)
    })

        reqAj('GET', "http://localhost/basesApirest/users", "contener", "", listeUsers)
})

