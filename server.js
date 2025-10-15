const express = require("express")
const cors = require("cors")
const fs = require("fs")
const { error } = require("console")
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const file = 'adatok.json'
if(!fs.existsSync(file)){
    fs.writeFileSync(file, JSON.stringify([]))

}
function betoltadatok(){
    return JSON.parse(fs.readFileSync(file,'utf8'))
}

function mentadatok(adatok){
    fs.writeFileSync(file, JSON.stringify(adatok, null, 2))
}

app.posti('/api/termekek', (req, res) => {
    const {nev, tipus, mennyiseg} = req.body;
    if(!nev || !tipus || !mennyiseg){
        return res.status(404).json({error:"NEMJo"})
    }
    const adatok = betoltadatok()
    const uj = {id: Date.now(), nev, tipus, mennyiseg: parseFloat(mennyiseg)}
    adatok.push(uj)
    mentadatok(adatok)
    res.json({message: 'termek hozzaadva', uj})
})
