'use client'
import { Map, Marker } from 'pigeon-maps'

export default function ContactMap() {
  return (
    <Map
      height={400}
      defaultCenter={[23.7276, 90.4080]}
      defaultZoom={14}
      attributionPrefix={false}
      attribution={false}
      mouseEvents={false}
      touchEvents={false}
      metaWheelZoom={false}
      provider={(x, y, z) =>
        `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}@2x.png`
      }
    >
      <Marker anchor={[23.7276, 90.4080]}>
        <div className="w-4 h-4 bg-[#12B5CB] rounded-full ring-4 ring-white shadow-xl" />
      </Marker>
    </Map>
  )
}
