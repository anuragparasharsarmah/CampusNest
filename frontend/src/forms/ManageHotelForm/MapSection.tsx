import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

declare global {
  interface Window {
    google?: any;
  }
}

type MapSectionProps = React.ComponentProps<'div'> & {
  onMarkerDrag: (latitude: number, longitude: number) => void;
};

interface Place {
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

const MapSection = ({ onMarkerDrag, ...rest }: MapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { watch } = useFormContext<HotelFormData>();
  const [latitude, longitude] = watch(['latitude', 'longitude']);
  const defaultLatitude = 12.9716;
  const defaultLongitude = 77.5946;
  const map_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${map_key}&libraries=places`;
      script.async = true;
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        initMap();
      });
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude || defaultLatitude, lng: longitude || defaultLongitude },
      zoom: 12,
    });

    const newMarker = new window.google.maps.Marker({
      position: { lat: latitude || defaultLatitude, lng: longitude || defaultLongitude },
      map: newMap,
      draggable: true,
    });

    newMarker.addListener('dragend', () => {
      const newLatitude = newMarker.getPosition()?.lat() || defaultLatitude;
      const newLongitude = newMarker.getPosition()?.lng() || defaultLongitude;
      onMarkerDrag(newLatitude, newLongitude);
    });

    if (searchInputRef.current) {
      const searchBox = new window.google.maps.places.SearchBox(searchInputRef.current);
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place: Place) => {
          if (!place.geometry) return;
          bounds.extend(place.geometry.location);
        });

        if (bounds.isEmpty()) return;
        newMap.fitBounds(bounds);
        newMarker.setPosition(places[0].geometry.location);
        onMarkerDrag(places[0].geometry.location.lat(), places[0].geometry.location.lng());
      });
    }
  };

  return (
    <div {...rest}>
      <h2 className="text-2xl font-bold mb-3">Location</h2>
      <input
        type="text"
        className="border-2 border-gray-300 p-2 rounded-md mb-2"
        placeholder="Search for a place"
        ref={searchInputRef}
      />
      <div className="h-96 w-full bg-gray-300" ref={mapRef}></div>
    </div>
  );
};

export default MapSection;