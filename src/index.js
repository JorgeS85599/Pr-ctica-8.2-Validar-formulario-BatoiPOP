'use strict'

const nombre = document.getElementById('nombre')
const precioOri = document.getElementById('original-price')
const precioDes = document.getElementById('discount-price')
const stars = document.getElementById('stars')
const acepto = document.getElementById('acepto')
const kilom = document.getElementById('kilometros')
const fuelInput = document.getElementById('fuel')

const REGEXP_PHOTO = '^.*\.(png|jpg|jpeg|webp)$'

showCars(products)


window.addEventListener('load', function() { 

    document.getElementById('new-prod').addEventListener('submit', (event) =>{
        event.preventDefault();

        let photo = document.getElementById('photo')
        let photoName = photo.value
        if (photoName != "" && photoName != undefined){
            if(!photoName.match(REGEXP_PHOTO)){
                photo.setCustomValidity('no es una foto valida')
            }else{
                photo.setCustomValidity('')
            }
        }

        let autGear = document.getElementById('automatic-gear')
        let manGear = document.getElementById('manual-gear')
        
        if(autGear.value || manGear.value){
            manGear.setCustomValidity('')         
        }else{
            manGear.setCustomValidity('Debes marcar una opcion')
        }


        if(!document.getElementById('new-prod').checkValidity()){
            
            nombre.nextElementSibling.textContent = nombre.validationMessage;
            precioOri.nextElementSibling.textContent = precioOri.validationMessage;
            precioDes.nextElementSibling.textContent = precioDes.validationMessage;
            stars.nextElementSibling.textContent = stars.validationMessage;
            acepto.nextElementSibling.textContent = acepto.validationMessage;
            kilom.nextElementSibling.textContent = kilom.validationMessage
            photo.nextElementSibling.textContent = photo.validationMessage;
            document.getElementById('spanerror-radio').textContent = manGear.validationMessage;
            fuelInput.nextElementSibling.textContent = fuelInput.validationMessage

            return;
        }

        let prueba = document.querySelector('input[name="gear"]:checked').value

        let gear = true
        if(prueba > 0){
            gear = false;
        }
        
        const name = nombre.value
        const km = Number(kilom.value)
        const original_price = Number(precioOri.value)
        const discount_price = Number(precioDes.value)
        const fuel = Number(fuelInput.value)
        const sale = false;
        const star = Number(stars.value)
        const manual_gear = gear
        removeAllChildNodes(document.getElementById('products'))
        if(discount_price > 0){
        addCoche({name,km,original_price,discount_price,fuel,sale,star,manual_gear})
        showCars(products)
        return
        }
        addCoche({name,km,original_price,fuel,sale,star,manual_gear})
        showCars(products)
    })
    

    typesOfFuel.forEach(element => {
        let newOption = document.createElement('option');
        newOption.innerHTML = element.fuel
        newOption.value = element.id
        document.getElementsByTagName('select')[0].appendChild(newOption);
    })

    document.getElementById('mostrarProductos').addEventListener('click', function() {
        document.getElementById('productos').classList.remove('hide')
        document.getElementById('form').classList.add('hide')
    })

    document.getElementById('mostrarFormulario').addEventListener('click',function() {
        document.getElementById('productos').classList.add('hide')
        document.getElementById('form').classList.remove('hide')
    })

    document.getElementById('nombre').addEventListener('blur',function() {
        nombre.setCustomValidity("")
        if (!nombre.checkValidity()) {
            if (nombre.validity.valueMissing) {
                nombre.setCustomValidity("Debes de introducir un nombre")
            }

            if (nombre.validity.tooShort) {
                nombre.setCustomValidity("El nombre debe de tener un mínimo de 10 caracteres")
            }
            
        } else {
            nombre.setCustomValidity("")
        }
        let spanError = nombre.nextElementSibling
        spanError.innerHTML = nombre.validationMessage
    })

    document.getElementById('original-price').addEventListener('blur',function() {
        precioOri.setCustomValidity("")
        if (!precioOri.checkValidity()) {
            if (precioOri.validity.valueMissing) {
                precioOri.setCustomValidity("Debes introducir un precio")
            }

            if (precioOri.validity.rangeUnderflow) {
                precioOri.setCustomValidity("Debes introducir un número positivo")
            }

            if (precioOri.validity.stepMismatch) {
                precioOri.setCustomValidity("Debes introducir un número con dos decimales")
            }
  
        } else {
            precioOri.setCustomValidity("")
        }
        let spanError = precioOri.nextElementSibling
        spanError.innerHTML = precioOri.validationMessage
    })

    document.getElementById('discount-price').addEventListener('blur',function() {
        precioDes.setCustomValidity("")
        if (!precioDes.checkValidity()) {
            
            if (precioDes.validity.rangeUnderflow) {
                precioDes.setCustomValidity("Debes introducir un número positivo")
            }

            if (precioDes.validity.stepMismatch) {
                precioDes.setCustomValidity("Debes introducir un número con dos decimales")
            }
  
        } else {
            precioDes.setCustomValidity("")
        }
        let spanError = precioDes.nextElementSibling
        spanError.innerHTML = precioDes.validationMessage
    })

    document.getElementById('stars').addEventListener('blur',function() {
        stars.setCustomValidity("")
        if (!stars.checkValidity()) {
            
            if (stars.validity.rangeUnderflow || stars.validity.rangeOverflow) {
                stars.setCustomValidity("Debes introducir un número entre 1 y 5")
            }

            if (stars.validity.stepMismatch) {
                stars.setCustomValidity("Debes introducir un número entero")
            }
  
        } else {
            stars.setCustomValidity("")
        }
        let spanError = stars.nextElementSibling
        spanError.innerHTML = stars.validationMessage
    })

    document.getElementById('kilometros').addEventListener('blur',function() {
        kilom.setCustomValidity("")
        if (!kilom.checkValidity()) {
            if (kilom.validity.valueMissing) {
                kilom.setCustomValidity("Debes introducir un número de kilometros")
            }
            
            if (kilom.validity.rangeUnderflow) {
                kilom.setCustomValidity("Debes introducir un número positivo")
            }

  
        } else {
            kilom.setCustomValidity("")
        }
        let spanError = kilom.nextElementSibling
        spanError.innerHTML = kilom.validationMessage
    })

    document.getElementById('acepto').addEventListener('blur',function() {
        acepto.setCustomValidity("")
        if (!acepto.checkValidity()) {
            if (acepto.validity.valueMissing) {
                acepto.setCustomValidity("Debes aceptar las condiciones")
            }
            
        } else {
            acepto.setCustomValidity("")
        }
        let spanError = acepto.nextElementSibling
        spanError.innerHTML = acepto.validationMessage
    })


  });

  function showCars(elementos) {

    elementos.forEach(element => {
        let estrellas = imprimirEstrellas(element);
        let newProd = document.createElement('div');
        newProd.innerHTML = 
        `<div class="card h-100">
            <!-- Sale badge, sólo si está vendido-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${element.sale?'Sale':''}</div>
            <!-- Product image-->
            <img class="card-img-top" src="./media/photos/${element.img}" alt="Imagen de _nombre_del_producto_" />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${element.name}</h5>
                    <!-- Product reviews, un div bi-star para cada estrella a pintar-->
                    <div class="d-flex justify-content-center small text-warning mb-2">
                        ${estrellas}
                    </div>
                    <!-- Product price-->
                    ${showPrice(element.original_price, element.discount_price)}
                    <!-- Product details -->
                    <p>
                        ${showFuel(element.fuel)} 
                        ${element.manual_gear ? 'Manual':'Automático'}
                        <br>${element.km.toLocaleString()}
                    </p>
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
            </div>
        </div>`;
        newProd.className = "col mb-5";
        document.getElementById('products').appendChild(newProd);
        
    });

  }



function imprimirEstrellas(elemento) {
    let estrellas = ""
    for(let i = 0; i < elemento.stars; i++) {
        estrellas += '<div class="bi-star-fill"></div>'
    }
    return estrellas;
}

function showFuel(typeId) {

    const fuel = typesOfFuel.find(item => item.id === typeId)
    return fuel ? fuel.fuel : 'Desconocido'
}

function showPrice(price, discount_price) {
    if (discount_price) {
        return `<span class="text-muted text-decoration-line-through">${toCurrency(price)}</span>
        ${toCurrency(discount_price)}`
    } else {
        return toCurrency(price)
    }
}

function toCurrency(amount) {
    return amount.toLocaleString() + '€'
}

function addCoche(newCar){
    products.push(newCar)
    document.getElementById('form').classList.add('hide')
    document.getElementById('productos').classList.remove('hide')
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}





