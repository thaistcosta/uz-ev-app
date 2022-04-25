import gql from "graphql-tag";

export const allCarsQuery = gql`
    {
        carList (size: 395) {
        id
        naming {
            make
            model
            version
            edition
            chargetrip_version
        }
        connectors {
            standard
            power
            time
            speed
        }
        adapters {
            standard
            power
            time
            speed
        }
        battery {
            usable_kwh
            full_kwh
        }
        body {
            seats
        }
        range {
            chargetrip_range {
            best
            worst
            }
        }
        media {
            image {
            id
            type
            url
            height
            width
            thumbnail_url
            thumbnail_height
            thumbnail_width
            }
            brand {
            id
            type
            url
            height
            width
            thumbnail_url
            thumbnail_height
            thumbnail_width
            }
            video {
            id
            url
            }
        }
        routing {
            fast_charging_support
        }
        }
    }
    `;
    

export const getRouteIdQuery = gql`
    mutation newRoute ($coordOrigin: [Float!]!, $coordDestination: [Float!]!, 
        $evId: ID!, $evBattery: Float!, $passengers: Int, $amenities: [String]){
        newRoute(
            input: {
            ev: {
                id: $evId,
                battery: {stateOfCharge: { value: $evBattery, type: kwh}
                }
                climate: true
                occupants: $passengers
            }
            routeRequest: {
                amenities: $amenities
                origin: {
                type: Feature
                geometry: { type: Point, coordinates: $coordOrigin }                  
                }
                destination: {
                type: Feature
                geometry: { type: Point, coordinates: $coordDestination }
                }
            }
        }) 
    }
    `;

export const getRouteQuery = gql`
    query getRoute ($routeId: ID!) {
        route(id:$routeId) {
        route {
            id
            type
            charges
            distance
            duration
            consumption
            chargeTime
            amenityRanking
            rangeStart
            rangeStartKwh
            rangeEnd
            rangeEndKwh
            via
            elevationUp
            elevationDown
            elevationMax
            pathPlot{
            elevation
            consumptionPerKm
            averageSpeed
            }
            polyline
            saving {
            co2
            money
            currency
            averageGasPrice
            averageEnergyPrice
            }
            legs {
            id
            distance
            duration
            consumption
            rangeStart
            rangeStartKwh
            rangeEnd
            rangeEndKwh
            origin {
                id
                type
                geometry {
                type
                coordinates
                }
                properties
            }
            destination {
                id
                type
                geometry {
                type
                coordinates
                }
                properties
            }
            type
            name
            stationId
            operatorId
            chargeTime
            evse {
                uid
                evse_id
                physical_reference
                status
                connectors {
                id
                power
                max_amperage
                max_voltage
                max_electric_power
                standard
                format
                power_type
                properties
                }
                parking_restrictions
                properties
            }
            connector {
                id
                power
                max_amperage
                max_voltage
                max_electric_power
                standard
                properties
            }
            plugsAvailable
            plugsCount
            }
        }
        status
        }
    }`; 


  
export const getRouteSubscription = gql`
    subscription routeUpdatedById ($routeId:ID!) {
        routeUpdatedById (id:$routeId) {
        status
        route {
            id
            type
            charges
            distance
            duration
            consumption
            chargeTime
            amenityRanking
            rangeStart
            rangeStartKwh
            rangeEnd
            rangeEndKwh
            via
            elevationUp
            elevationDown
            elevationMax
            pathPlot{
            elevation
            consumptionPerKm
            averageSpeed
            }
            polyline
            saving {
            co2
            money
            currency
            averageGasPrice
            averageEnergyPrice
            }
            legs {
            id
            distance
            duration
            consumption
            rangeStart
            rangeStartKwh
            rangeEnd
            rangeEndKwh
            origin {
                id
                type
                geometry {
                type
                coordinates
                }
                properties
            }
            destination {
                id
                type
                geometry {
                type
                coordinates
                }
                properties
            }
            type
            name
            stationId
            operatorId
            chargeTime
            evse {
                uid
                evse_id
                physical_reference
                status
                connectors {
                id
                power
                max_amperage
                max_voltage
                max_electric_power
                standard
                format
                power_type
                properties
                }
                parking_restrictions
                properties
            }
            connector {
                id
                power
                max_amperage
                max_voltage
                max_electric_power
                standard
                properties
            }
            plugsAvailable
            plugsCount
            }

        }
        }
    }`;
  