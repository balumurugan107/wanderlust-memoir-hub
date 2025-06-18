
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, DollarSign, Camera } from 'lucide-react';

interface TripCardProps {
  trip: {
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
  };
  onViewDetails: (tripId: string) => void;
}

const TripCard = ({ trip, onViewDetails }: TripCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'current': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const budgetPercentage = (trip.spent / trip.budget) * 100;
  const budgetColor = budgetPercentage > 100 ? 'text-rose-500' : budgetPercentage > 80 ? 'text-amber-500' : 'text-emerald-500';

  return (
    <Card className="card-hover group cursor-pointer border-slate-200" onClick={() => onViewDetails(trip.id)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl group-hover:text-teal-600 transition-colors">
              {trip.destination}
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {trip.country}
            </p>
          </div>
          <Badge className={getStatusColor(trip.status)}>
            {trip.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{trip.startDate} - {trip.endDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="h-4 w-4" />
            <span className={budgetColor}>
              ${trip.spent} / ${trip.budget}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Camera className="h-4 w-4" />
            <span>{trip.photos.length} photos</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              budgetPercentage > 100 ? 'bg-red-500' : 
              budgetPercentage > 80 ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {trip.description}
        </p>

        <Button 
          variant="outline" 
          className="w-full group-hover:bg-ocean-50 group-hover:border-ocean-300"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(trip.id);
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default TripCard;
