export interface ChargingInfo {
    chargerName: string
    connectorsAvailable: string[]
    connector: {
        power: number
        power_type: string
        standard: string
    }
    rangeStart: number
    rangeEnd: number
    km: number
    carUsableKwh: number
    chargeTime: string
    drivingTime: string
}