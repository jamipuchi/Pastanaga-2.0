const center_x = "41.388554"
const center_y = "2.112380"
const radius = 300

const estaFIB = (latitud, longitud) => {
    if ((latitud-center_x)^2 + (longitud - center_y)^2 <= radius^2) return true;
    else return false;
}

module.exports = {
    estaFIB
}