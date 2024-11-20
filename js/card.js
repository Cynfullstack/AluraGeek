const container = document.querySelector('.cards__container')
const form = document.querySelector('#form')




const addProduct = async (title, price, image) => {
    const newProduct = {
        title,
        price,
        image
    };

    const res = await fetch('https://673bd5b796b8dcd5f3f7a093.mockapi.io/api/v1/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    });

    window.location.assign(window.location.href);
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = form.elements.title.value;
    const price = form.elements.price.value;
    const image = form.elements.image.value;


    await addProduct(title, price, image);
});



async function deleteProduct(id) {        
    const res = await fetch(`https://673bd5b796b8dcd5f3f7a093.mockapi.io/api/v1/products/${id}`, {
        method: 'DELETE',
    });
    window.location.assign(window.location.href);
}



const getData = async () => {
    const res = await fetch('https://673bd5b796b8dcd5f3f7a093.mockapi.io/api/v1/products');
    const data = await res.json(); // [] de productos
    console.log(data);
    
    let html = '';

    data.forEach(item => {
        html += `
            <div class="card" id="card-${item.id}">
                <img src="${item.image}" alt="Producto 1" class="card__imagen">
                <p class="producto__card">${item.title}</p>
                <p class="precio__card">Precio: $${item.price}</p>
                <button class="eliminar" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }); //removeById(10)

    container.innerHTML = html;

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', async() => {
            const id = btn.getAttribute('data-id')
            await deleteProduct(id)
        })
    })
};

getData();


