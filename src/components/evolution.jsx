import { createEffect, createSignal, onMount, } from 'solid-js';
import { createStore } from "solid-js/store";
import { request } from '../request';
import { Chart, registerables} from 'chart.js';
import { dateFilter, onRegion, setOnRegion } from '../signals';
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
    var top10_produit  = null
    var top10_region = null
    var evolution_ca = null
    var orders_month = null

    var chart_top10_product = null;
    var chart_top10_region  = null;
    var chart_evolution_ca  = null;
    var chart_top10_order_month = null;

    const updateGraph = (chart, labels, datas) => {
        chart.data.labels           = labels
        chart.data.datasets[0].data = datas
        chart.update()
    }

    const chartUpdateIfExist = (chart, data) => {
        if(chart != null){
            updateGraph(chart, data[0], data[1])
        }   
        return chart
    }

    const loadData = async () =>{
        
        const region   = onRegion() != null ? String(onRegion()['id']).toLowerCase().replace('.', '-')  : 'undefined'
        const response = await  (await request('evolutions?annee=' + dateFilter() + '&region=' + region, 'GET', null)).json()
        
        top10_produit = response['TOP10product']
        top10_region  = response['TOP10states']
        evolution_ca  = response['evolutionsCA']
        orders_month  = response['EvolutionsVolume']

        chartUpdateIfExist(chart_top10_product, top10_produit)
        chartUpdateIfExist(chart_top10_region, top10_region)
        chartUpdateIfExist(chart_evolution_ca, evolution_ca)
        chartUpdateIfExist(chart_top10_order_month, orders_month)
    }

    onMount(async () => {
        await loadData()
        
        createEffect(async () => {
            onRegion()
            dateFilter()
            console.log('okok');
            await loadData()
        })

        chart_top10_product = buildChart('pie-10-produit', 'pie', {        
            data: {
                labels: top10_produit[0],
                datasets: [{
                    label: 'Volume de ventes',
                    data: top10_produit[1],
                    borderWidth: 0.5,
                    borderColor:'grey',
                    backgroundColor:[
                        '#4d576c',
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

        chart_top10_region  = buildChart('pie-10-region', 'pie', {        
            data: {
                labels: top10_region[0],
                datasets: [{
                    label: 'Chiffre d\'affaire',
                    data: top10_region[1],
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

        chart_evolution_ca  = buildChart('line-chiffre-affaire', 'line', {        
            data: {
                labels: evolution_ca[0],
                datasets: [{
                    label: 'Chiffre d\'affaire',
                    data: evolution_ca[1],
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
                        grid: {
                            color: '#4d576c'
                        },
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
                        grid: {
                            color: '#4d576c'
                        },
                      ticks: {
                         color: 'white'
                        },

                    }
                  },
            }
        })

        chart_top10_order_month = buildChart('line-nb-orders', 'line', {        
            data: {
                labels: orders_month[0],
                datasets: [{
                    label: 'Nombre de commandes',
                    data: orders_month[1]
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
                        grid: {
                            color: '#4d576c'
                        },
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
                        grid: {
                            color: '#4d576c'
                        },
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
                <div className="w-full ">
                    <canvas id="line-chiffre-affaire" style='height: 180px'></canvas>
                </div>
                <div className="w-full ">
                    <canvas id="line-nb-orders" style='height: 180px'></canvas>
                </div>
            </div>

        </section>
    </>
}