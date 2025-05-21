


const url = 'https://www.dnd5eapi.co'

const myHeaders = new Headers()
myHeaders.append("Accept", "application/json")

const requestOption = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
}

export async function getBeast(endPoint) {
    const resp = await fetch(url + endPoint, requestOption)
    const data = await resp.json()
    return url + data.image
}


export async function getAllMonstersName(number) {
    const resp = await fetch(url + "/api/2014/monsters")
    const data = await resp.json()
    return {
        url: data.results[number].url,
        name: data.results[number].name
    }
    // return await data.results[number].url
}