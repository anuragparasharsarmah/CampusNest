import React, { useEffect, useRef } from 'react';

const map_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

declare global {
  interface Window {
    google?: any;
  }
}

type MapSectionProps = React.ComponentProps<'div'> & {
  latitude: number;
  longitude: number;
};

const MapSection = ({ latitude, longitude, ...rest }: MapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
      });
    };

    if (!scriptLoadedRef.current) {    
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${map_key}`;
      script.async = true;
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        scriptLoadedRef.current = true;
        initMap();
      });
    } else {
      initMap();
    }

    return () => {
      if (scriptLoadedRef.current) {
        window.google = null;
      }
    };
  }, [latitude, longitude]);

  return (
    <div {...rest} className="reviews-container space-y-6">
      <h2 className="reviews-heading text-2xl font-bold">Location</h2>
      <div className="h-96 w-full bg-gray-300" ref={mapRef}></div>
    </div>
  );
};

export default MapSection;