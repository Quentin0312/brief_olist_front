import { createResource, onMount } from "solid-js"

const descriptionChartRequest = async () => (await fetch('http://localhost:8000/api/annonces/', {method: 'GET'})).json().then(
    response => {loadChart(response.description.labels, response.description.values)})

function loadChart(labels, values){
    const ctx = document.getElementById('descriptionChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels : labels,
            datasets : [{
                label: 'test',
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Volume de ventes selon la longueur de la description des produits'
                }
            }
        } 
    })
}


export default function Annonce(props){
    const [descriptionChartData] = createResource(descriptionChartRequest)


    return(<>
        <main id='lbl-1' class=" flex flex-wrap w-full rounded p-6 bg-[#383838] text-white">
            <section className="w-full flex flex-wrap">
                <div className="">
                    <div id="pie-10-produit"></div>
                </div>

                <div className="">
                    <div id="pie-10-region"></div>
                </div>
            </section>

            <section className="w-full flex flex-wrap">
                line / tab section
            </section>

            <section className="w-full flex flex-wrap">
                <canvas id="descriptionChart"> </canvas>
            </section>
        </main>
    </>)
}