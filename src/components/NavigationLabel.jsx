import { onLabel, setOnLabel } from "../signals";

export default function NavigationLabel(){

    const changeLabel = (e) => {
        const label = e.target.attributes['data-label'].value
        const parent = e.target.parentElement.children
        for(let child of [...parent]){
            const el_label = child.attributes['data-label'].value
            if(el_label == label) child.classList.add('bg-gray-700', 'translate-y-[-10px]')
            else child.classList.remove('bg-gray-700', 'translate-y-[-10px]')
        }

        setOnLabel(label)
    }

    return (<>
    <nav class="flex w-full mx-auto my-5">
        <button class="mx-3 w-1/4 bg-[#383838] text-white px-3 py-2 rounded drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] duration-300" data-label='evolution' onclick={changeLabel}>
            évolution détaillés
        </button>

        <button class="mx-3 w-1/4 bg-[#383838] text-white px-3 py-2 rounded drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] duration-300" data-label='annonce' onclick={changeLabel}>
            qualité de l'annonce 
        </button>

        <button class="mx-3 w-1/4 bg-[#383838] text-white px-3 py-2 rounded drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] duration-300" data-label='nv-client-rebond' onclick={changeLabel}>
            Nouveaux clients et rebonds
        </button>

        <button class="mx-3 w-1/4 bg-[#383838] text-white px-3 py-2 rounded drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] duration-300" data-label='local-inter' onclick={changeLabel}>
            local / inter-régional
        </button>
    </nav>
    </>)
}