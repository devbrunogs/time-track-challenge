import "regenerator-runtime/runtime";

async function updateMonthData(id, data) {
    const response = await fetch(`http://localhost:3000/entries/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

async function getCurrentMonthData(year, month, uid) {
    const url = `http://localhost:3000/entries?year=${year}&month=${month}&uid=${uid}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

async function setNewMonthTable(data) {
    const response = await fetch('http://localhost:3000/entries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export default {
    setNewMonthTable,
    getCurrentMonthData,
    updateMonthData
}
