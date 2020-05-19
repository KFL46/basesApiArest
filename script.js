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

function ajxDebug(xhr, div) {
    console.log(xhr)
    document.getElementById(div).innerHTML = "statut : " + xhr.status + " <br/>Réponse :" + xhr.responseText
}

window.addEventListener("load", () => {

    document.getElementById("menLstUt").addEventListener("click", (e) => {
        e.preventDefault()
        reqAj('GET', "http://localhost/basesApirest/users", "contener", "", ajxDebug)
    })

    reqAj('GET', "http://localhost/basesApirest/users", "contener", "", ajxDebug)
})