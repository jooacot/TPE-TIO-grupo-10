"use strict"
let form = document.querySelector('form.simulator');
form.addEventListener('submit', agregarPresupuesto);
document.querySelector('#empty').addEventListener("click", emptyTable);
document.querySelector('#add3').addEventListener("click", add3);
document.addEventListener("DOMContentLoaded", showTable);

/* Estructuras */
let tableBudget = [
	{
		nombre: "Ejemplo 1",
		material: "PLA",
		cantGr: "10",
		horas:"1",
		presupuesto: presupuestar("PLA",10,1),
	},
	{   
		nombre: "Ejemplo 2",
		material: "ABS",
		cantGr: "150",
		horas:"5",
		presupuesto: presupuestar("ABS",150,5),
	},
	{
		nombre: "Ejemplo 3",
		material: "Tecnicos",
		cantGr: "242",
		horas:"16",
		presupuesto: presupuestar("Tecnicos",10,1),
	},
]

let addNew3 = [
    {
        nombre: "Ejemplo 4",
        material: "PLA",
        cantGr: "10",
        horas:"1",
        presupuesto: presupuestar("PLA",10,1),
    },
    {   
        nombre: "Ejemplo 5",
        material: "ABS",
        cantGr: "150",
        horas:"5",
        presupuesto: presupuestar("ABS",150,5),
    },
    {
        nombre: "Ejemplo 6",
        material: "Tecnicos",
        cantGr: "242",
        horas:"16",
        presupuesto: presupuestar("Tecnicos",10,1),
    },
]
 
    function agregarPresupuesto(event){
        event.preventDefault();
        let formData = new FormData(form);
		let nombre = formData.get("clientname");
        let material= formData.get("material");
        let gramos= Number(formData.get("gr"));
        let time= Number (formData.get("time"));
        let presupuesto=presupuestar(material, gramos, time);
        let budgetentry = {
            nombre: nombre,
            material:material ,
            cantGr: gramos,
			horas: time,
            presupuesto: presupuesto,
            }
		tableBudget.push(budgetentry);
		showTable();
    }
    
    function presupuestar(material, cantGr, time){
        let costoMaterial=calcularCosto(material, cantGr);
        const mMarcacion = 2.5;
        const manoObra = 30;
        return (costoMaterial+time*manoObra)*mMarcacion;
    }
    
    function calcularCosto (material, gramos){
        const costoPlaGr = 1600/1000;
		const costoAbsGr = 2000/1000;
		const costoPetgGr = 1900/1000;
		const costoFlexGr = 2300/1000;
		const costoTecnicosGr = 3000/1000;
		let costoMaterial;
		switch (material) {
			case "PLA":
				costoMaterial = costoPlaGr*gramos;
			break;
			case "ABS":
				costoMaterial = costoAbsGr*gramos;
			break;
			case "Pet-g":
				costoMaterial = costoPetgGr*gramos;
				break;
			case "Flex":
				costoMaterial = costoFlexGr*gramos;
				break;
			case "Tecnicos":
				costoMaterial = costoTecnicosGr*gramos;
				break;
		}
		return costoMaterial;
	}

function showTable(){
    let HTMLtable = document.querySelector("table.presupuesto tbody");
    HTMLtable.innerHTML="";
    for (const item of tableBudget ) {
        HTMLtable.innerHTML += `<tr>
                            <td>${item.nombre}</td>
                            <td>${item.material}</td>
                            <td>${item.cantGr}</td>
                            <td>${item.horas}</td>
                            <td>${item.presupuesto}</td>
                        </tr>`
    }
}

function emptyTable (){
    tableBudget = [];
	showTable();
}

function add3 (){
	for (const item of addNew3) {
		tableBudget.push(item);
	}
    /* tableBudget = tableBudget.concat(addNew3); */
	showTable();
} 