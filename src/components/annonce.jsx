import { createResource, onMount, createEffect } from "solid-js"
import { getRegionPostcode } from "../signals"; 
import { request } from '../request';
import ChartDataLabels from 'chartjs-plugin-datalabels';

var photosChart
var descriptionChart

Chart.register(ChartDataLabels);

function addData(chart, label, values) {
    let iterationAddLabel = label.length
    for (let k = 0; k < iterationAddLabel; k++){
        chart.data.labels[k] = label[k];
    }
    for (let k = 0; k < iterationAddLabel; k++){
        chart.data.datasets[0].data[k] = values[k];
    }
    chart.update();
}

function removeData(chart) {
    console.log(chart)
    let iteration = chart.data.labels.length
    console.log(iteration)
    for (let i = 0; i < iteration; i++){
        chart.data.labels.pop();
    }
    let iterationValues = chart.data.datasets[0].data.length
    for (let j = 0; j < iterationValues; j++){
        chart.data.datasets[0].data.pop();
    }
    
    chart.update();
}

const chartRequest = async () => (await request('annonces/','GET', null)).json().then(
    response => {
        const labelsPhotos=nettoyageLabels(response.photos.labels);
        const labelsDescription=nettoyageLabels(response.description.labels);
        descriptionChart = loadDescriptionChart(labelsDescription, response.description.values);
        photosChart = loadPhotosQtyChart(labelsPhotos, response.photos.values);
        // console.log(photosChart)
    })

function nettoyageLabels(labels){
    const cleanLabels= labels.map((label)=>{
        if (label === 'Non renseigné') {
            return label
          }
          return label.substring(3)
    })
    return cleanLabels
}

const chartRequestBis = async (region) => (await request('annonces?region='+region,'GET', null)).json().then(
    response => {
        descriptionChart = loadDescriptionChart(response.description.labels, response.description.values);
        photosChart = loadPhotosQtyChart(response.photos.labels, response.photos.values);
    })

const updateChartRequest = async (region) => (await request('annonces?region='+region,'GET', null)).json().then(
    response => {
        console.log('getRegionPostcode()')
        console.log(photosChart)
        removeData(photosChart);
        removeData(descriptionChart);
        addData(descriptionChart, response.description.labels, response.description.values)
        addData(photosChart, response.photos.labels, response.photos.values)
    }
)

function loadDescriptionChart(labels, values){
    const ctx = document.getElementById('descriptionChart');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels : labels,
            datasets : [{
                label: 'Volume de ventes',
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            aspectRatio: 3.5,
            plugins: {
                title: {
                    display: true,
                    text: 'Volume de ventes selon la longueur de la description des produits',
                    color:'white',
                    font:{
                        size:16,
                    },
                },
                legend:{
                    display:false,
                },
                datalabels: {
                    color: 'white',
                    labels: {
                        value: {
                            display:'auto',
                            anchor:'start',
                            color:'white',
                            align: 'top',
                            offset:-3,
                            font: {size: 13, weight:'bold'},
                            formatter: function(value, ctx) {
                              return ctx.active
                                ? value.toLocaleString("fr-FR")
                                : value.toLocaleString("fr-FR")
                            },
                          },
                    }
                  }
            },
            scales: {
                y: {
                    // type:'logarithmic',
                    // suggestedMax:Math.max(...values)+10000,
                    grid: {
                        color: '#4d576c'
                    },
                  ticks: {
                     color: 'white',
                    },
                    title:{
                        display:true,
                        text:'Volume de ventes',
                        color:'white',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                },
                x: {
                    grid: {
                        color: '#4d576c'
                    },
                  ticks: {
                     color: 'white'
                    },
                    title:{
                        display:true,
                        text:'Longueur de la description',
                        color:'white',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                }
              },
        } 
    })
    return chart
}

function loadPhotosQtyChart(labels, values){
    const ctx = document.getElementById('photosQtyChart');
    let truc = new Chart(ctx, {
        type: 'bar',
        data: {
            labels : labels,
            datasets : [{
                label: 'Volume de ventes',
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            aspectRatio: 3.5,
            plugins: {
                title: {
                    display: true,
                    text: 'Volume de ventes selon la quantité de photos',
                    color:'white',
                    font:{
                        size:16,
                    },
                },
                
                legend:{
                    display:false,
                },
                datalabels: {
                    color: 'white',
                    labels: {
                        value: {
                            display:'auto',
                            anchor:'start',
                            color:'white',
                            align: 'top',
                            offset:-3,
                            font: {size: 13, weight:'bold'},
                            formatter: function(value, ctx) {
                              return ctx.active
                                ? value.toLocaleString("fr-FR")
                                : value.toLocaleString("fr-FR")
                            },
                          },
                    }
                  }
            },
            scales: {
                y: {
                    // type:'logarithmic',
                    // suggestedMax:Math.max(...values)+2000,
                    grid: {
                        color: '#4d576c'
                    },
                  ticks: {
                     color: 'white',
                    },
                    title:{
                        display:true,
                        text:'Volume de ventes',
                        color:'white',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                },
                x: {
                    grid: {
                        color: '#4d576c'
                    },
                  ticks: {
                     color: 'white'
                    },
                    title:{
                        display:true,
                        text:'Quantités de photos',
                        color:'white',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                }
              },
        } 
    })
    return truc
}


export default function Annonce(props){
    if (getRegionPostcode() == null){
        const [chartDatas] = createResource(chartRequest);
    }

    createEffect(()=>{
        if (getRegionPostcode() != null){
            
            // Cas onglet ouvert lors de la selection du pays
            if (document.getElementById('photosQtyChart').style[0] == 'display' ){
                const [updateChartDatas] = createResource(getRegionPostcode(), updateChartRequest);
            }
            // Cas changement d'onglet après qu'une région est déjà été séléctionné
            else {
                const [chartDatasBis] = createResource(getRegionPostcode(), chartRequestBis);
            }

        }

    })

    return(<>
        <main id='lbl-1' class=" flex flex-wrap w-full rounded p-6 bg-[#383838] text-white space-y-4">

            <section className="w-full flex flex-wrap">
                <canvas id="photosQtyChart"> </canvas>
            </section>

            <section className="w-full flex flex-wrap">
                <canvas id="descriptionChart"> </canvas>
            </section>
        </main>
    </>)
}