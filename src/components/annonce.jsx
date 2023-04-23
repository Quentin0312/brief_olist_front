import { createResource, onMount } from "solid-js"
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const descriptionChartRequest = async () => (await fetch('http://localhost:8000/api/annonces/', {method: 'GET'})).json().then(
    response => {
        const labelsPhotos=nettoyageLabels(response.photos.labels)
        const labelsDescription=nettoyageLabels(response.description.labels)
        loadDescriptionChart(labelsDescription, response.description.values)
        loadPhotosQtyChart(labelsPhotos, response.photos.values, )
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


function loadDescriptionChart(labels, values){
    const ctx = document.getElementById('descriptionChart');
    new Chart(ctx, {
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
}

function loadPhotosQtyChart(labels, values){
    const ctx = document.getElementById('photosQtyChart');
    new Chart(ctx, {
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
}


export default function Annonce(props){
    const [descriptionChartData] = createResource(descriptionChartRequest)


    return(<>
        <main id='lbl-1' class=" flex flex-wrap w-full rounded p-6 bg-[#383838] text-white space-y-4">

            <section className="w-full flex flex-wrap border-4 border-gray-600 rounded-md">
                <canvas id="photosQtyChart"> </canvas>
            </section>

            <section className="w-full flex flex-wrap border-4 border-gray-600 rounded-md">
                <canvas id="descriptionChart"> </canvas>
            </section>
        </main>
    </>)
}