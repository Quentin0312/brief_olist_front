import { Show, onMount } from "solid-js"
import MapSection from "../components/MapSection"
import NavigationLabel from "../components/NavigationLabel"
import { onLabel } from "../signals"
import Evolution from "../components/evolution"
import Annonce from "../components/annonce"
import NVClientRebond from "../components/NVClientRebond"
import LocalInter from "../components/LocalInter"

export default function Dashboard(){

    const loadTop10 = async () => {

    }

    return (<>
    <div className="flex flex-wrap w-full h-[100vh]">
        <section className="w-full lg:w-1/2">
            <MapSection />
        </section>

        <main className="w-full lg:w-1/2 px-10">
            <NavigationLabel />

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