const seleccionDeMoneda = document.querySelector("#seleccionDeMoneda");

async function getDatos() {
  const urlApi = "https://mindicador.cl/api";
  try {
    const res = await fetch(urlApi);
    selectorDivisa = await res.json();
    cargaSelect(selectorDivisa);
  } catch (e) {
    alert("refresque la página, por favor", e);
  }
}

async function getDatosUltimos10Dias(endPoint) {
  const urlApi10Dias = "https://mindicador.cl/api/";
  try {

    const res = await fetch(`${urlApi10Dias}${endPoint}`);
    ultimos10Dias = await res.json();
    ultimosRegistros = ultimos10Dias.serie;
    ultimosDiezRegistros = ultimosRegistros.slice(ultimosRegistros.lenght, 10);

    valor = ultimosDiezRegistros.map((ele) => {
      return ele.valor;
    });

    fecha = ultimosDiezRegistros.map((ele) => {
      return ele.fecha.slice(0, 10);
    });
  } catch (e) {
    alert("refresque la página, por favor", e);
  }

  graficoChart(fecha, valor);
}

function cargaSelect(selectorDivisa) {
  html = `<option>Moneda a convertir</option>
              
              <option name="${selectorDivisa.euro.codigo}" value="${selectorDivisa.euro.valor}">${selectorDivisa.euro.codigo}</option>
              <option name="${selectorDivisa.dolar.codigo}" value="${selectorDivisa.dolar.valor}">${selectorDivisa.dolar.codigo}</option>`;
  seleccionDeMoneda.innerHTML = html;
}

function valorSeleccionado(event) {
  let nombre = seleccionDeMoneda.options[seleccionDeMoneda.selectedIndex].getAttribute("name");
  getDatosUltimos10Dias(nombre);
  valorSelected = Number(event.target.value);
}

function buscar() {
  const pesoChileno = Number(document.querySelector("#monedaChilena").value);

  if (isNaN(pesoChileno)) {
    console.log("valor ingresado", pesoChileno);
    alert("El valor ingresado debe ser un numero");
  } else {
    conversion(valorSelected, pesoChileno);
  }
}

function conversion(valorSelected, pesoChileno) {
  let htmlModificado = "";

  resultado = (pesoChileno / valorSelected).toFixed(2);
  htmlModificado = `<p class="resultado">Resultado: ${resultado}</p>`;
  resultadoConversion.innerHTML = htmlModificado;
}

function graficoChart(fecha, valor) {

  const llamadoGrafico = document.querySelector("#myChart").getContext("2d");

  const myChart = new Chart(llamadoGrafico, {
    type: "line",
    data: {
      labels: fecha,
      datasets: [
        {
          label: "Resumén últimos 10 dias",
          data: valor,
          backgroundColor: [
            "red",
            "red",
          ],
          borderColor: [
            "golden",
            "golden",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

window.onload = function () {
  getDatos();
};




