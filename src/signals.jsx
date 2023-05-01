import { createSignal } from "solid-js";

export const [topographie, setTopographie] = createSignal()
export const [map, setMap] = createSignal()
export const [onLabel, setOnLabel] = createSignal('evolution')
export const [onRegion, setOnRegion] = createSignal()

export const [regions, setRegions] = createSignal([])
export const [regionFilter, setRegionFilter] = createSignal()
export const [dateFilter,   setDateFilter]   = createSignal()
export const [getRegionPostcode, setRegionPostcode] = createSignal()