import { createEffect, createSignal } from "solid-js"
import { dateFilter, onRegion, regionFilter, regions, setOnRegion } from "../signals";
import { setDateFilter, setRegionFilter } from "../signals";
import { request } from "../request";
import { findinTopoByName, getNameInTopo } from "../utils";

export default function FilterBar() {
    var select_region = null;

    const [dateRange, setDateRange] = createSignal([])
    
    const loadFilterParams = async () => {
        const response = await ( await request('date/minmax', 'GET', null)).json()
        setDateRange(response)
    }
    const handleRegionFilter = (event) => {
        const region_name = event.target.value 
        const region      = findinTopoByName(region_name)
        setOnRegion(region)
    }

    const handleDateFilter = (event) => {
        console.log(event);
        setDateFilter(event.target.value)
    }

    loadFilterParams()
    return (<>
        <div id="filter-bar" class="flex flex-wrap w-full rounded px-5 py-2 mb-5 bg-[#4d576c] text-white"> 
            <h5 class="w-1/6 mr-5">Filtres: </h5>

            <section class="btn-group flex justify-start gap-3 items-center text-xs">
                <select class="rounded p-1 px-3" name="filter-region" onchange={handleRegionFilter}>
                    <option value="all">Toutes</option>
                    <For each={regions()}>{(region, i) =>
                        <option value={region}>{region}</option>
                    }</For>
                </select>

                <select class="rounded p-1 px-3" name="date-filter" onchange={handleDateFilter}>
                    <option value="all">Toutes</option>
                    <For each={dateRange()}>{(year, i) =>
                        <option value={year}>{year}</option>
                    }</For>
                </select>
            </section>
        </div>
    </>)
}