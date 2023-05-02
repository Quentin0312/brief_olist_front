import { createEffect, createResource, createSignal, onMount } from "solid-js";

import * as Highcharts from 'highcharts/highmaps';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

import {setMap, regionFilter, setRegionFilter, setRegionPostcode, setTopographie, topographie, setOnRegion, onRegion} from '../signals'
import { request } from "../request";
import { regions, setRegions } from "../signals";
import { findinTopoByID, findinTopoByName } from "../utils";

export default function MapSection(){
    
    const [sellVolume, setSellVolume] = createSignal()

    const getFullNameListOfRegions = (topo_data) => {
        var regions_ = []
        for(var geo of topo_data){
            if(geo.properties !== undefined && geo.properties['woe-name'])
                regions_.push(geo.properties['woe-name'])
        }
        setRegions(regions_)
    } 
    
    onMount(async () =>{
        // Reçois les données
        const topo    = await (await fetch('https://code.highcharts.com/mapdata/countries/br/br-all.topo.json')).json()
        const mapData = await (await request('map', 'GET', null)).json()
        
        // Défini les var global Topographie & onRegion
        setTopographie(topo)
        setOnRegion(findinTopoByID(mapData[0][0]))
        
        // Récupère une liste des noms des régions 
        getFullNameListOfRegions(topo.objects.default.geometries)
        
        // Définir une valeur par région pour le filtre région
        setRegionFilter(onRegion())
        
        // Définie un volume des ventes
        setSellVolume(mapData[0][1])        
        
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
                                console.log(e.point.name);
                                setOnRegion(findinTopoByName(e.point.name))
                                
                                setRegionFilter(e.point.name)
                                setSellVolume(e.point.options.value)
                                let selectedRegion = e.point.options['hc-key']
                                selectedRegion = selectedRegion.slice(3,).toUpperCase()
                                setRegionPostcode(selectedRegion)
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
            Région: {regionFilter()} <br />
            Volume de ventes: {sellVolume()} <br />
        </div>
    </>)
}