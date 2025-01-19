let inPrice = document.getElementById('price');
let inTaxes = document.getElementById('taxes');
let inAds = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let title = document.getElementById('title');
let mood = 'create'
let temp;
// Get Total
function getTotale() {
    if (inPrice.value != '') {
        let allTotal = (+inPrice.value + +inTaxes.value + +inAds.value) - +discount.value;
        total.textContent = allTotal;
        total.style.background = 'green';
    } else {
        total.textContent = '';
        total.style.background = '#a00d02';
    }
}

// Data storage
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

// Create product
submit.onclick = function () {
    let newdatapro = {
        title: title.value,
        inPrice: inPrice.value,
        inTaxes: inTaxes.value,
        inAds: inAds.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value,
    };
if(title.value!='' && inPrice.value!=''&&category.value!=''&&newdatapro.count <=100){
if (mood === 'create') {
        if (newdatapro.count > 1) {
            for (let i = 0; i < newdatapro.count; i++) {
                datapro.push(newdatapro);
            }
        } else {
            datapro.push(newdatapro);
        }
    } else {
        datapro[temp] = newdatapro; 
        mood = 'create'; 
        submit.innerHTML = 'Create'; 
        count.style.display = 'block'; 
    }
}
    

    localStorage.setItem('product', JSON.stringify(datapro));
    clearData();
    read();
};


// Read data
function read() {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; 
    for (let i = 0; i < datapro.length; i++) {
        tableBody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].inPrice}</td>
                <td>${datapro[i].inTaxes}</td>
                <td>${datapro[i].inAds}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" class="update">Update</button></td>
                <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
            </tr>
        `;
    }

    let btnDelete = document.getElementById('deleteALL');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
    getTotale()
}

// Clear input fields
function clearData() {
    title.value = '';
    inPrice.value = '';
    inTaxes.value = '';
    inAds.value = '';
    discount.value = '';
    total.textContent = '';
    count.value = '';
    category.value = '';
}

// Delete one product
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(datapro));
    read();
}

// Delete all products
function deleteAll() {
    datapro = [];
    localStorage.removeItem('product');
    read();
}

// Update product
function updateData(i) {
    let product = datapro[i];
    title.value = product.title;
    inPrice.value = product.inPrice;
    inTaxes.value = product.inTaxes;
    inAds.value = product.inAds;
    discount.value = product.discount;
    total.textContent = product.total;
    count.style.display = 'none'; 
    category.value = product.category;
    temp = i; 
    submit.innerHTML = 'Update'; 
    mood = 'update'; 
    scroll({
        top:0,
        behavior:'smooth',
    })
}


// Load data on page load
window.onload = read;

//search
let search = document.getElementById('search')
let searchMood = 'title';
function getsearchmood(id){

if(id == 'searchTitle'){
    searchMood = 'title'
search.placeholder = 'Search by Title'
}else{
    searchMood = 'category'
    search.placeholder = 'Search by category'
}

search.focus();



}

function searchData(value) {
    console.log('Search Value:', value, 'Search Mood:', searchMood);

    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    let found = false;

    datapro.forEach((product, i) => {
        if (
            (searchMood === 'title' && product.title.toLowerCase().includes(value.toLowerCase())) ||
            (searchMood === 'category' && product.category.toLowerCase().includes(value.toLowerCase()))
        ) {
            tableBody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${product.title}</td>
                    <td>${product.inPrice}</td>
                    <td>${product.inTaxes}</td>
                    <td>${product.inAds}</td>
                    <td>${product.discount}</td>
                    <td>${product.total}</td>
                    <td>${product.category}</td>
                    <td><button onclick="updateData(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>
            `;
            found = true;
        }
    });

    if (!found) {
        tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center;">No matching results found</td></tr>`;
    }
}
