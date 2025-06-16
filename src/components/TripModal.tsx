
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, DollarSign, Camera } from 'lucide-react';
import BudgetChart from './BudgetChart';
import PhotoGallery from './PhotoGallery';

interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  photos: Array<{
    id: string;
    url: string;
    caption: string;
    tags: string[];
  }>;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
  expenses: Array<{
    category: string;
    amount: number;
    color: string;
  }>;
}

interface TripModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
}

const TripModal = ({ trip, isOpen, onClose }: TripModalProps) => {
  if (!trip) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'current': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const budgetPercentage = (trip.spent / trip.budget) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{trip.destination}</DialogTitle>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {trip.country}
              </p>
            </div>
            <Badge className={getStatusColor(trip.status)}>
              {trip.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Trip Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-ocean-50 to-ocean-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-ocean-700 mb-2">
                <CalendarDays className="h-4 w-4" />
                <span className="font-medium">Duration</span>
              </div>
              <p className="text-sm">{trip.startDate} - {trip.endDate}</p>
            </div>

            <div className="bg-gradient-to-r from-sunset-50 to-sunset-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sunset-700 mb-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Budget</span>
              </div>
              <p className="text-sm">
                ${trip.spent} / ${trip.budget} ({budgetPercentage.toFixed(0)}%)
              </p>
            </div>

            <div className="bg-gradient-to-r from-earth-50 to-earth-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-earth-700 mb-2">
                <Camera className="h-4 w-4" />
                <span className="font-medium">Memories</span>
              </div>
              <p className="text-sm">{trip.photos.length} photos</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About This Trip</h3>
            <p className="text-muted-foreground">{trip.description}</p>
          </div>

          {/* Budget Charts */}
          {trip.expenses.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Budget Analysis</h3>
              <BudgetChart expenses={trip.expenses} totalBudget={trip.budget} />
            </div>
          )}

          {/* Photo Gallery */}
          <PhotoGallery 
            photos={trip.photos} 
            onAddPhoto={() => console.log('Add photo clicked')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripModal;
