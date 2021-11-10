const API_URL = 'https://randomuser.me/api/?results=500'

const search_el = document.querySelector('.search')
const user_container_el = document.querySelector('.user-container')

let num = 500
let user_array = []

getUserData()

async function getUserData() {
    user_container_el.innerHTML = ''
    const { data } = await axios(API_URL)
    
    for(let i = 0; i < num; i++){
        let user_data = data.results[i]
        const user_node = document.createElement('div')
        user_node.classList.add('user')
        user_node.innerHTML = `
            <img src='${user_data.picture.thumbnail}' alt=''/>
            <div class="user-info">
                <h3>${user_data.name.first} ${user_data.name.last}</h3>
                <p>${user_data.location.city}, ${user_data.location.country}</p>
            </div>
        `
        user_array.push(user_node)
        user_container_el.appendChild(user_node)
    }
}

search_el.addEventListener('input', searchData)

function searchData(e) {
    let query = e.target.value
    user_array.forEach(user => {
        if (user.innerText.toLowerCase().includes(query.toLowerCase())) {
            user.classList.remove('hidden')
        }
        else {
            user.classList.add('hidden')
        }
    })
}
