"use client";

import { GoogleMap as GMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

type GoogleMapProps = {
  center: { lat: number; lng: number };
  zoom?: number;
  markerLabel?: string;
  className?: string;
};

export default function GoogleMap({ center, zoom = 16, markerLabel, className }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  if (!apiKey) {
    return null;
  }

  if (loadError) {
    return null;
  }

  return (
    <div className={className}>
      {isLoaded && (
        <GMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={zoom}
          options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
        >
          <MarkerF
            position={center}
            label={markerLabel ? { text: markerLabel, fontWeight: "500" as google.maps.MarkerLabel["fontWeight"] } : undefined}
            icon={{
              url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
              scaledSize: new google.maps.Size(27, 43),
              anchor: new google.maps.Point(13, 43),
              labelOrigin: new google.maps.Point(40, 45),
            }}
          />
        </GMap>
      )}
    </div>
  );
}


