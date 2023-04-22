import { Show, onMount } from "solid-js"
import MapSection from "../components/MapSection"
import NavigationLabel from "../components/NavigationLabel"
import { onLabel } from "../signals"
import Evolution from "../components/evolution"
import Annonce from "../components/annonce"
import NVClientRebond from "../components/NVClientRebond"
import LocalInter from "../components/LocalInter"
import FilterBar from "../components/filter_bar"

export default function Dashboard(){


    return (<>
    <div className="flex flex-wrap w-full h-fit">
        <section className="w-full lg:w-5/12">
            <MapSection />
        </section>

        <main className="w-full lg:w-7/12 px-10 h-fit">
            <header>
                <NavigationLabel />
                <FilterBar />
            </header>
            
        
            <div className="flex">
                <Show when={onLabel() == 'evolution'}>
                    <Evolution />
                </Show>


                <Show when={onLabel() == 'annonce'}>
                    <Annonce />
                </Show>

                <Show when={onLabel() == 'nv-client-rebond'}>
                    <NVClientRebond />
                </Show>

                <Show when={onLabel() == 'local-inter'}>
                    <LocalInter />
                </Show>
            </div>
        </main>
    </div>
    </>)
}