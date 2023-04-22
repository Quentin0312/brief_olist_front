import { createSignal, onMount } from 'solid-js';
import { request } from '../request';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);
const buildChart = (container_id, chart_type, chart_data_options) => {
    const contex = document.getElementById(container_id).getContext("2d");
    return new Chart(contex, {
        type: chart_type,
        ...chart_data_options
    })
}


export default function Evolution(props){
    const loadData = async () =>{
        return await  (await request('evolutions', 'GET', null)).json()
    }

    
    
    onMount(async () => {
        const data = await loadData()
        
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
                maintainAspectRatio: true,
                plugins: {
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
                maintainAspectRatio: true,
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
        <section id='section-evolution' class=" flex flex-wrap w-full rounded p-6 bg-[#383838] text-white">
            <div className="flex flex-wrap justify-between w-full">
                <div className="">
                    <canvas id="pie-10-produit"></canvas>
                </div>

                <div className="">
                    <canvas id="pie-10-region"></canvas>
                </div>
            </div>

            <div className=" w-full">
                <canvas id="line-chiffre-affaire" class='my-3'></canvas>
                <canvas id="line-nb-orders" class='my-3'></canvas>
            </div>

        </section>
    </>
}