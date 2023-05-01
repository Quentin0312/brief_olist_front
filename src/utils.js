import { topographie } from "./signals";

export function findinTopoByID(topo_id){
    const id              = String(topo_id).replace('-', '.').toUpperCase()
    const topo_geometries = topographie().objects.default.geometries
    return topo_geometries.filter(el => el.id == id)[0]
}

export function findinTopoByName(topo_name){
    const topo_geometries = topographie().objects.default.geometries
    return topo_geometries.filter(el => el.properties['woe-name'] == topo_name)[0]
}

export function getNameInTopo(topo_region){
    if(topo_region.properties){
        return topo_region.properties['woe-name']
    }
    return topo_region
}