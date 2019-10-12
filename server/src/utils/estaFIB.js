const x1 = "41.391700" // coordenades al voltant de la FIB
const x2 = "41.385774"
const y1 = "2.113015"
const y2 = "2.111178"

const estaFIB = (latitud, longitud) => {
    if (latitud > x1 && latitud < x2 && longitud > y1 && longitud < y2) return true;
    else return false;
}

module.exports = {
    estaFIB
}