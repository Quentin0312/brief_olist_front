import { createEffect, createSignal, onMount } from 'solid-js';
import { request } from '../request';
import { Chart, registerables} from 'chart.js';
import { dateFilter, onRegion } from '../signals';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);


Chart.register(...registerables);
const buildChart = (container_id, chart_type, chart_data_options) => {
    const contex = document.getElementById(container_id).getContext("2d");
    return new Chart(contex, {
        type: chart_type,
        ...chart_data_options
    })
}


export default function Evolution(props){
    const loadData = async (params) =>{
        return await  (await request('evolutions?annee=' + dateFilter(), 'GET', null)).json()
    }

    ///////////////////  Ancienne requête
    // const loadData = async () =>{
    //     return await  (await request('evolutions', 'GET', null)).json()
    // }

    onMount(async () => {
        let data = await loadData()
        
        createEffect(async () => {
            onRegion()
            data = await loadData([dateFilter(), onRegion()])
        })

        buildChart('pie-10-produit', 'pie', {        
            data: {
                labels: data['TOP10product'][0],
                datasets: [{
                    label: 'Volume de ventes',
                    data: data['TOP10product'][1],
                    borderWidth: 0.5,
                    borderColor:'grey',
                    backgroundColor:['#4d576c',
                        '#5c677a',
                        '#6b7789',
                        '#7b8797',
                        '#8b98a6',
                        '#9da9b5',
                        '#afbac4',
                        '#c1ccd3',
                        '#d4dde3',
                        '#e8eff3',   
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 produit',
                        color:'white',
                        font:{
                            size:16,
                        },
                    },

                    legend: {
                      display: false
                    },
                    datalabels: {
                        color: 'white',
                        labels: {
                            value: {
                                anchor:'center',
                                color:'black',
                                align: 'end',
                                font: {size: 13, weight:'bold'},
                                formatter: function(value, ctx) {
                                  return ctx.active
                                    ? value
                                    : value
                                },
                              },
                        }
                      }
                }
            }
        })

        buildChart('pie-10-region', 'pie', {        
            data: {
                labels: data['TOP10states'][0],
                datasets: [{
                    label: 'Chiffre d\'affaire',
                    data: data['TOP10states'][1],
                    borderWidth: 0.5,
                    borderColor:'grey',
                    backgroundColor:['#4d576c',
                        '#5c677a',
                        '#6b7789',
                        '#7b8797',
                        '#8b98a6',
                        '#9da9b5',
                        '#afbac4',
                        '#c1ccd3',
                        '#d4dde3',
                        '#e8eff3',   
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 par région',
                        color:'white',
                        font:{
                            size:16,
                        },
                    },
                    legend: {
                      display: false,
                    },
                    datalabels: {
                        color: 'white',
                        labels: {
                            value: {
                                display:'auto',
                                anchor:'center',
                                color:'black',
                                align: 'end',
                                font: {size: 13, weight:'bold'},
                                formatter: function(value, ctx) {
                                  return ctx.active
                                    ? ctx.chart.data.labels[ctx.dataIndex]
                                    : ctx.chart.data.labels[ctx.dataIndex]
                                },
                              },
                        }
                      }
                }
            }
        })

        buildChart('line-chiffre-affaire', 'line', {        
            data: {
                labels: data['evolutionsCA'][0],
                datasets: [{
                    label: 'Chiffre d\'affaire',
                    data: data['evolutionsCA'][1],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolution du chiffre d\'affaire',
                        color:'white',
                        font:{
                            size:16,
                        },
                    },
                    legend: {
                      display: false
                    },
                    datalabels: {
                        labels: {
                            value: {
                                display:false,
                              },
                        }
                      }
                },
                scales: {
                    y: {
                      ticks: {
                         color: 'white',
                        },
                        title:{
                            display:true,
                            text:'Chiffre d\'affaires',
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

                    }
                  },
            }
        })

        buildChart('line-nb-orders', 'line', {        
            data: {
                labels: data['EvolutionsVolume'][0],
                datasets: [{
                    label: 'Nombre de commandes',
                    data: data['EvolutionsVolume'][1],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Nombre commande / mois',
                        color:'white',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                    },
                    legend: {
                      display: false
                    },
                    datalabels: {
                        labels: {
                            value: {
                                display:false,
                              },
                        }
                      }
                },
                scales: {
                    y: {
                      ticks: {
                         color: 'white',
                        },
                        title:{
                            display:true,
                            text:'Commandes',
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

                    }
                  },
            }
        })
    })

    return <>
        <section id='section-evolution' class="w-full rounded px-6 py-4 bg-[#383838] text-white space-y-4">
            <div className="flex flex-wrap justify-around w-full">
                <div className="">
                    <canvas id="pie-10-produit" style='height: 120px'></canvas>
                </div>

                <div className="">
                    <canvas id="pie-10-region" style='height: 120px'></canvas>
                </div>
            </div>

            <div className="w-full space-y-4">
                <div className="w-full border-4 border-gray-600 rounded-md">
                    <canvas id="line-chiffre-affaire" style='height: 180px'></canvas>
                </div>
                <div className="w-full border-4 border-gray-600 rounded-md">
                    <canvas id="line-nb-orders" style='height: 180px'></canvas>
                </div>
            </div>

        </section>
    </>
}