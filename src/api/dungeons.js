


const url = 'https://www.dnd5eapi.co'

const myHeaders = new Headers()
myHeaders.append("Accept", "application/json")

const requestOption = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
}

export async function getBeastImg(endPoint) {
    const resp = await fetch(url + endPoint, requestOption)
    const data = await resp.json()
    return url + data.image
}

export async function getMonsterInfo(endPoint) {
    const resp = await fetch(url + endPoint, requestOption)
    const data = await resp.json()
    return {
        name: string = data.name,
        strength: string = data.strength,
        dexterity: string = data.dexterity,
        constitution: string = data.constitution,
        intelligence: string = data.intelligence,
        wisdom: string = data.wisdom,
        charisma: string = data.charisma,
        image: string = url + data.image,
    }
}

export async function getAllMonstersName() {
    const resp = await fetch(url + "/api/2014/monsters")
    const data = await resp.json()
    return data.results
}