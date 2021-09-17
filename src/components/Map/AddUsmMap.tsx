import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import { MapMarkerIcon } from './MapMarkerIcon'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LatLngTuple } from 'leaflet'

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

interface DraggableMarkerProps {
  initialPosition: Location
  updatePosition: (position: Location) => void
}

type Location = {
  lat: number;
  lng: number;
}

interface MapProps {
  center: Location;
  updatePosition: (position: Location) => void
}

function DraggableMarker({ initialPosition, updatePosition }: DraggableMarkerProps) {
  const [position, setPosition] = useState(initialPosition)
  const markerRef = useRef(null)

  useEffect(() => { setPosition(initialPosition) }, [initialPosition, updatePosition])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current
        if (marker != null) {
          const position = marker.getLatLng()
          setPosition(position)
          updatePosition(position)
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={MapMarkerIcon}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  )
}

export default function Map({ center, updatePosition }: MapProps) {
  return (
    <>
      <MapContainer center={center} zoom={15} scrollWheelZoom style={{height: 300, width: "100%"}}>
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{ apiKey }}/>
        <DraggableMarker initialPosition={center} updatePosition={updatePosition}/>
      </MapContainer>
    </>
  )
}