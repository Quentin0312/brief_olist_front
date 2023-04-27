import { createSignal } from "solid-js";

export const [map, setMap] = createSignal()
export const [onLabel, setOnLabel] = createSignal('evolution')

export const [regionFilter, setRegionFilter] = createSignal()
export const [dateFilter,   setDateFilter]   = createSignal()
export const [getRegionPostcode, setRegionPostcode] = createSignal()