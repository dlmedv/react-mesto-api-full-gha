
export const options = {
    url: "https://api.dlmedvmesto.nomoredomains.rocks",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
}





