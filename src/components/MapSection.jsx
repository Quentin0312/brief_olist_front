import { createEffect, createResource, createSignal, onMount } from "solid-js";

import * as Highcharts from 'highcharts/highmaps';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

import {map, setMap} from '../signals'
import { request } from "../request";


export default function MapSection(){
    const [onRegion,   setOnRegion]   = createSignal('braisil')
    const [sellVolume, setSellVolume] = createSignal()
    const [sumOrder,   setSumOrder]   = createSignal()


    onMount(async () =>{
        const topo    = await (await fetch('https://code.highcharts.com/mapdata/countries/br/br-all.topo.json')).json()
        const mapData = await (await request('map', 'GET', null)).json()

        console.log(mapData )

        const chart = Highcharts.mapChart('container', {
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false  
                    }
                }
            },
            chart: { 
                map: topo, 
                backgroundColor: 'transparent',
                height: 600
            },
            title: {
                text: 'Brésil - Chiffres d\'affaire par région',
                style: {
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize:'24px',
                }
            },
            series: [{
                data: mapData,
                name: 'Région',
                states: { hover: { color: '#a3a3a3' } },

                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
            }],
            colorAxis: {
                type: 'logarithmic',
                minColor: '#ffffff',
                maxColor:'#3060cf',   //#4a4a4a  #3060cf
            },
            legend: {
                backgroundColor: '#ffffff',
            },
        
    
            plotOptions: {
                series: {
                     cursor: 'pointer',
                     point: {
                         events: {
                            click: function(e) {
                                console.log(e.point);
                                setOnRegion(e.point.name)
                            }
                        }
                    }
                }
            },

        });

        setMap(chart)
        // Pour mettre à jour une données de la map 
        // chart.update({ series: { data: mapData } })
    })

    return (<>
        <div id="container"></div>
        <div class="w-3/5 shadow-xl px-5 py-4 mx-auto bg-[#4d576c] text-white rounded drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
            Région: {onRegion()} <br />
            Volume de ventes: {sellVolume()} <br />
            Nombre de commandes total: {sumOrder()}
        </div>
    </>)
}