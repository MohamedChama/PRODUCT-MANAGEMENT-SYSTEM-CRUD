

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'create'
let tmp;

// get total

function getTotale() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value - +discount.value)
        total.innerHTML = result
        total.style.background = 'rgb(2, 165, 2)'
    } else {
        total.innerHTML = ''
        total.style.background = '#a00d02'

    }
}
// create product

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];

}

showdata();


submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
    }
    if (mood == 'create') {
        datapro.push(newpro);
    } else {
        datapro[tmp] = newpro
        mood = 'create'
        submit.innerHTML = 'Create'
        submit.style.background = '#390053'


    }



    localStorage.setItem('product', JSON.stringify(datapro))

    clearinputs();
    showdata();
    getTotale()


}
// save localstorage
datapro.push(newpro);
localStorage.setItem('product', JSON.stringify(datapro))

// clear inputs
function clearinputs() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    category.value = ''
}

// read

function showdata() {
    let table = ''
    for (let i = 0; i < datapro.length; i++) {
        table += ` 
        <tr>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                        <td><button onclick="deletdata(${i})" id="delet">Delet</button></td>

                    </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML = table

}

// delete

function deletdata(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    showdata();

}





// update

function updatedata(i) {
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    total.innerHTML = datapro[i].total

    category.value = datapro[i].category

    getTotale()
    submit.style.background = 'rgb(2, 165, 2)'
    submit.innerText = 'Update'

    mood = 'update'
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth'
    })
    getTotale()

}


// search

function srearchdata(value) {
    let table = ''
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i].title.includes(value)) {
            table += ` 
            <tr>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                            <td><button onclick="deletdata(${i})" id="delet">Delet</button></td>
    
                        </tr>
            
            `;

        }

    }
    document.getElementById('tbody').innerHTML = table

}
// clean data