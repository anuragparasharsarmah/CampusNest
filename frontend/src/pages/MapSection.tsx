import React, { useEffect, useRef } from 'react';

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
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9iV2P2e2OcJHvwUiYWsUazmYHaXXRZ6E`;
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
    <div {...rest}>
      <div className="h-96 w-full bg-gray-300" ref={mapRef}></div>
    </div>
  );
};

export default MapSection;