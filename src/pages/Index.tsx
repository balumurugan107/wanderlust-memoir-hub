
import { useState } from 'react';
import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';
import TripCard from '@/components/TripCard';
import TripModal from '@/components/TripModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock data for demonstration
const mockTrips = [
  {
    id: '1',
    destination: 'Paris',
    country: 'France',
    startDate: '2024-05-15',
    endDate: '2024-05-22',
    budget: 2500,
    spent: 2100,
    description: 'A romantic getaway to the City of Light. Explored the Louvre, climbed the Eiffel Tower, and enjoyed countless croissants.',
    status: 'completed' as const,
    photos: [
      { id: '1', url: '/placeholder.svg', caption: 'Eiffel Tower at sunset', tags: ['landmark', 'sunset'] },
      { id: '2', url: '/placeholder.svg', caption: 'Louvre Museum', tags: ['museum', 'art'] }
    ],
    expenses: [
      { category: 'Accommodation', amount: 800, color: '#94a3b8' },
      { category: 'Food', amount: 600, color: '#f59e0b' },
      { category: 'Transport', amount: 400, color: '#10b981' },
      { category: 'Activities', amount: 300, color: '#8b5cf6' }
    ]
  },
  {
    id: '2',
    destination: 'Tokyo',
    country: 'Japan',
    startDate: '2024-08-10',
    endDate: '2024-08-20',
    budget: 3500,
    spent: 1200,
    description: 'Current adventure in the land of the rising sun. Experiencing the perfect blend of traditional culture and modern innovation.',
    status: 'current' as const,
    photos: [
      { id: '3', url: '/placeholder.svg', caption: 'Tokyo skyline', tags: ['city', 'modern'] }
    ],
    expenses: [
      { category: 'Accommodation', amount: 500, color: '#94a3b8' },
      { category: 'Food', amount: 400, color: '#f59e0b' },
      { category: 'Transport', amount: 300, color: '#10b981' }
    ]
  },
  {
    id: '3',
    destination: 'Santorini',
    country: 'Greece',
    startDate: '2024-09-15',
    endDate: '2024-09-25',
    budget: 2800,
    spent: 0,
    description: 'Upcoming Mediterranean escape. Planning to explore the famous blue domes, enjoy local wines, and watch incredible sunsets.',
    status: 'upcoming' as const,
    photos: [],
    expenses: []
  }
];

const Index = () => {
  const [selectedTrip, setSelectedTrip] = useState<typeof mockTrips[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (tripId: string) => {
    const trip = mockTrips.find(t => t.id === tripId);
    if (trip) {
      setSelectedTrip(trip);
      setIsModalOpen(true);
    }
  };

  const handleLocationAdd = (location: { lat: number; lng: number; name: string }) => {
    console.log('New location added:', location);
    // Here you would typically open a form to add trip details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Map Section */}
        <section className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Travel Map</h2>
              <p className="text-muted-foreground">Click anywhere to add a new destination</p>
            </div>
          </div>
          <MapComponent onLocationAdd={handleLocationAdd} />
        </section>

        {/* Trips Section */}
        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Journeys</h2>
              <p className="text-muted-foreground">Track your adventures and memories</p>
            </div>
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Trip
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTrips.map((trip, index) => (
              <div 
                key={trip.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <TripCard trip={trip} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-500">3</div>
              <div className="text-sm text-muted-foreground">Countries Visited</div>
            </div>
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-pink-400">5</div>
              <div className="text-sm text-muted-foreground">Total Trips</div>
            </div>
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-teal-400">$8,800</div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
            </div>
            <div className="glass-effect p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-400">5</div>
              <div className="text-sm text-muted-foreground">Photos Captured</div>
            </div>
          </div>
        </section>
      </main>

      <TripModal 
        trip={selectedTrip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
