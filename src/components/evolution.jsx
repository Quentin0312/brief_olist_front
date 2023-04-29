import { createEffect, createSignal, onMount } from 'solid-js';
import { request } from '../request';
import { Chart, registerables} from 'chart.js';
import { dateFilter, onRegion } from '../signals';

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
                    label: '# of Votes',
                    data: data['TOP10product'][1],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 produit'
                    },

                    legend: {
                      display: false
                    }
                }
            }
        })

        buildChart('pie-10-region', 'pie', {        
            data: {
                labels: data['TOP10states'][0],
                datasets: [{
                    label: '# of Votes',
                    data: data['TOP10states'][1],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 par région'
                    },
                    legend: {
                      display: false
                    }
                }
            }
        })

        buildChart('line-chiffre-affaire', 'line', {        
            data: {
                labels: data['evolutionsCA'][0],
                datasets: [{
                    label: '# of Votes',
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
                        text: 'Evolution du chiffre d\'affaire'
                    },
                    legend: {
                      display: false
                    }
                }
            }
        })

        buildChart('line-nb-orders', 'line', {        
            data: {
                labels: data['EvolutionsVolume'][0],
                datasets: [{
                    label: '# of Votes',
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
                        text: 'Nombre commande / mois'
                    },
                    legend: {
                      display: false
                    }
                }
            }
        })
    })

    return <>
        <section id='section-evolution' class="w-full rounded px-6 py-4 bg-[#383838] text-white">
            <div className="flex flex-wrap justify-around w-full">
                <div className="">
                    <canvas id="pie-10-produit" style='height: 120px'></canvas>
                </div>

                <div className="">
                    <canvas id="pie-10-region" style='height: 120px'></canvas>
                </div>
            </div>

            <div className="w-full">
                <div className="w-full">
                    <canvas id="line-chiffre-affaire" style='height: 180px'></canvas>
                </div>
                <div className="w-full">
                    <canvas id="line-nb-orders" style='height: 180px'></canvas>
                </div>
            </div>

        </section>
    </>
}