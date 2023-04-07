import { onMount } from "solid-js"
import MapSection from "../components/MapSection"

export default function Dashboard(){


    return (<>
    <div className="flex flex-wrap w-full h-[100vh]">
        <section className="w-full lg:w-1/2 bg-red-400">
            <MapSection />
        </section>

        <section className="w-full lg:w-1/2 bg-blue-400">frefr</section>
    </div>
    </>)
}