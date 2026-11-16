fetch('./annunci.json').then((response) => response.json()).then((data) => {



let annunciContainer = document.querySelector('#annunciContainer');

function showCards(arrayProdotti) {
    if (!annunciContainer) return;
    annunciContainer.innerHTML = "";

    arrayProdotti.forEach((prodotto) => {
        let div = document.createElement('div');
        div.className = "col-12 col-md-4 mb-4";
        
        div.innerHTML = `
            <div class="card h-100 text-center shadow-sm border border-secondary-subtle p-3 bg-white">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title fw-bold text-dark fs-5 mb-2">${prodotto.name}</h5>
                    <p class="card-text text-muted mb-3 fs-6">${prodotto.category}</p>
                    <p class="card-text fw-semibold text-dark fs-5 mb-0">${Number(prodotto.price).toFixed(2)} €</p>
                </div>
            </div>
        `;
        annunciContainer.appendChild(div);
    });
}


 
function filterByCategory(arrayDiPartenza) {
    let radioButtons = document.querySelectorAll('.form-check-input');
    let radioButtonArray = Array.from(radioButtons);
    let buttonChecked = radioButtonArray.find(radio => radio.checked);
    
    if (!buttonChecked) return arrayDiPartenza;

    let idSelezionato = buttonChecked.id;

    if (idSelezionato === 'All') {
        return arrayDiPartenza;
    } else {
        let categoriaPulita = idSelezionato.split('_').join(' ');
        return arrayDiPartenza.filter(annuncio => annuncio.category === categoriaPulita);
    }
}



function filterByPrice(arrayDiPartenza) {
    let inputPrezzo = document.querySelector('#inputPrezzo');
    if (!inputPrezzo) return arrayDiPartenza;
    
    return arrayDiPartenza.filter(annuncio => Number(annuncio.price) <= inputPrezzo.value);
}

function filterByWord(arrayDiPartenza) {
    let inputParola = document.querySelector('#inputParola');
    if (!inputParola) return arrayDiPartenza;
    
    let valoreRicerca = inputParola.value.toLowerCase();
    return arrayDiPartenza.filter(annuncio => annuncio.name.toLowerCase().includes(valoreRicerca));
}

function filterAll() {
    let filtratiPerCategoria = filterByCategory(data);
    let filtratiPerPrezzo = filterByPrice(filtratiPerCategoria);
    let filtratiFinali = filterByWord(filtratiPerPrezzo);
    
    showCards(filtratiFinali);
}


function setCategoriesRadios() {
  let uniqCategories = [];
data.forEach((annuncio) => {
    if (!uniqCategories.includes(annuncio.category)) {
        uniqCategories.push(annuncio.category);
    }
});

    
    console.log(uniqCategories);

    let filtroCategoria = document.querySelector('#filtroCategoria');
    
    if (filtroCategoria) {
        let vecchiRadio = filtroCategoria.querySelectorAll('.dynamic-category');
        vecchiRadio.forEach(el => el.remove());

        uniqCategories.forEach((categoria) => {
            let div = document.createElement('div');
            div.className = "form-check mb-2 d-flex align-items-center dynamic-category";
            
            let idValido = categoria.split(' ').join('_');

            div.innerHTML = `
                <input class="form-check-input me-2 mt-0 category-radio" type="radio" name="categories" id="${idValido}">
                <label class="form-check-label fw-medium text-dark" for="${idValido}">
                    ${categoria}
                </label>
            `;
            filtroCategoria.appendChild(div);
        });
    }

    let radioButtons = document.querySelectorAll('input[name="categories"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            filterAll();
        });
    });
}


function setPriceRange() {
    let prezziNumerici = data.map(annuncio => Number(annuncio.price));
    
    prezziNumerici.sort((a, b) => a - b);
    
    let prezzoPiuAlto = prezziNumerici.pop();
    let limiteMassimoIntero = Math.ceil(prezzoPiuAlto);

    let inputPrezzo = document.querySelector('#inputPrezzo');
    let prezzoSelezionato = document.querySelector('#prezzoSelezionato');



    if (inputPrezzo && prezzoSelezionato) {
        inputPrezzo.min = 0;
        inputPrezzo.max = limiteMassimoIntero;
        inputPrezzo.value = limiteMassimoIntero; 
        
        prezzoSelezionato.innerHTML = inputPrezzo.value + " €";

        inputPrezzo.addEventListener('input', () => {
            prezzoSelezionato.innerHTML = inputPrezzo.value + " €";
            filterAll(); 
        });
    }
}


function setWordFilter() {
    let inputParola = document.querySelector('#inputParola');
    if (inputParola) {
        inputParola.addEventListener('input', () => {
            filterAll();
        });
    }
}

setCategoriesRadios();
setPriceRange();
setWordFilter();
showCards(data);
});
