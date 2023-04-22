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
        <div id="filter-bar" class="w-full flex"> 
            <h5 class="w-1/6 mr-5">Filtres: </h5>

            <section class="btn-group flex justify-start">
                <select name="filter-region" onchange={handleRegionFilter}>
                    <option value="all">Toutes</option>
                </select>

                <select name="date-filter" onchange={handleDateFilter}>
                    <option value="today">aujourd'hui</option>
                </select>
            </section>
        </div>
    </>)
}