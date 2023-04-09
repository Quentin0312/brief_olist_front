import * as Highcharts from 'highcharts/highmaps';
import Exporting from 'highcharts/modules/exporting';
import { createSignal, onMount } from 'solid-js';
import { request } from '../request';
Exporting(Highcharts);  

const buildChart = (containerid, chartData) => {
    Highcharts.chart(containerid, {
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false  
                }
            }
        },

        chart: {
            type: chartData.type ?? 'pie',
            backgroundColor: '#383838',
            width: 505,
            
            
        },
        title: {
            text: chartData.title ?? 'Pas de titre',
            align: 'center',
            style: {
                color: 'white'
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'Area (square km): <b>{point.y}</b><br/>' 
        },
        series: [{
            minPointSize: 10,
            innerSize: '60%',
            zMin: 0,
            name: 'countries',
            data: [...chartData.series]
        }],
        
    });
}
export default function Evolution(props){
    const [pieData10Product, setPieData10Product] = createSignal()

    const loadTop10 = async () =>{
        const data = await  (await request('evolutions', 'GET', null)).json()
        console.log(typeof(data['TOP10product']));
        await setPieData10Product(data['TOP10product'])
    }
    loadTop10()
    onMount(async () => {
        
        console.log(typeof(pieData10Product()));

        buildChart('pie-10-produit', {
            type: 'pie',
            title: 'Top 10 produits',
            series: pieData10Product()
        })

        buildChart('pie-10-region', {
            type: 'pie',
            title: 'Top 10 region'
        })
    })

    return (<>n
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
                line section
            </section>
        </main>
    </>)
}