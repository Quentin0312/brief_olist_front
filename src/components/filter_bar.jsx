import { createSignal } from "solid-js"
import { dateFilter, regionFilter } from "../signals";
import { setDateFilter, setRegionFilter } from "../signals";

export default function FilterBar() {

    const handleRegionFilter = (event) => {
        console.log(event);
    }

    const handleDateFilter = (event) => {
        console.log(event);
    }

    return (<>
        <div id="filter-bar" class="flex flex-wrap w-full rounded px-5 py-2 mb-5 bg-[#4d576c] text-white"> 
            <h5 class="w-1/6 mr-5">Filtres: </h5>

            <section class="btn-group flex justify-start gap-3 items-center text-xs">
                <select class="rounded p-1 px-3" name="filter-region" onchange={handleRegionFilter}>
                    <option value="all">Toutes</option>
                </select>

                <select class="rounded p-1 px-3" name="date-filter" onchange={handleDateFilter}>
                    <option value="today">aujourd'hui</option>
                </select>
            </section>
        </div>
    </>)
}