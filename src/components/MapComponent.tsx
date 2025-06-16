
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface MapComponentProps {
  onLocationAdd?: (location: { lat: number; lng: number; name: string }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationAdd }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initializeMap = async () => {
    if (!mapboxToken || !mapContainer.current) return;

    try {
      // Dynamically import mapbox-gl to avoid SSR issues
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.default.accessToken = mapboxToken;
      
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        zoom: 2,
        center: [0, 20],
        projection: 'globe' as any,
      });

      // Add navigation controls
      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      // Add click handler for adding locations
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        
        // Add marker
        new mapboxgl.default.Marker({
          color: '#f97316'
        })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.default.Popup().setHTML(`
            <div class="p-2">
              <p class="font-semibold text-sm">New Location</p>
              <p class="text-xs text-gray-600">Click to add trip details</p>
            </div>
          `)
        )
        .addTo(map);

        // Notify parent component
        if (onLocationAdd) {
          onLocationAdd({
            lat,
            lng,
            name: `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`
          });
        }

        toast({
          title: "Location added!",
          description: "Click the marker to add trip details.",
        });
      });

      setIsMapLoaded(true);
      setShowTokenInput(false);

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to load the map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  };

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox public token.",
        variant: "destructive"
      });
      return;
    }
    initializeMap();
  };

  if (showTokenInput) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Setup Mapbox</h3>
        <p className="text-sm text-muted-foreground mb-4">
          To display the interactive map, please enter your Mapbox public token.
          <br />
          <a 
            href="https://account.mapbox.com/access-tokens/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-ocean-600 hover:underline"
          >
            Get your token from mapbox.com
          </a>
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZS..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTokenSubmit} className="bg-ocean-600 hover:bg-ocean-700">
            Load Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-ocean-50 to-sunset-50">
        <h3 className="text-lg font-semibold text-gray-800">Interactive Travel Map</h3>
        <p className="text-sm text-gray-600">Click anywhere to add a visited location</p>
      </div>
      <div ref={mapContainer} className="h-96 w-full" />
    </Card>
  );
};

export default MapComponent;
