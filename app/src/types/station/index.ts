interface IStationParams {
    id?: string,
    lin?: string,
    name?: string,
    status?: string,
    site_id?: string,
    location?: IGeoParams,
    completion_date?: string,
    meter?: IMeterParams[],
    street_address?: string,
    city?: string,
    state?: string,
    zip_code?: number,
    public?: boolean
}

interface IGeoParams {
    type?: string,
    coordinates?: number[]
}

interface IMeterParams {
    oem_id?: string,
    oem?: string,
    position: string,
    level: string
}

export default IStationParams