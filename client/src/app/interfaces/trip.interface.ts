export interface Trip {
    routeId: string
    routeType: string
    stops: number
    totalDistance: number
    totalDuration: string
    chargeTime: string
    drivingDuration: string
    rangeStartPercentage: number
    rangeEndPercentage: number
    legs: [{
        distance: number,
        duration: string,
        rangeStartPercentage: number
        rangeEndPercentage: number
        chargeTime: string
    }]
      
}