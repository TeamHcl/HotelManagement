import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

export interface HotelData {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
}

export function HotelCard({ hotel }: { hotel: HotelData }) {
  return (
    <Card className="group overflow-hidden bg-card/50 border-white/5 hover:border-white/20 transition-all duration-500 glass hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg border border-white/10">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold">{hotel.rating}</span>
          <span className="text-xs text-muted-foreground ml-1">({hotel.reviews})</span>
        </div>
      </div>

      <CardContent className="p-5 pb-2 relative">
        {/* Floating badge effect */}
        <Badge variant="secondary" className="absolute -top-4 left-5 bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 backdrop-blur-lg backdrop-filter">
          Top Rated
        </Badge>
        
        <div className="flex gap-1.5 items-center text-muted-foreground mb-2 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold uppercase tracking-wider">{hotel.location}</span>
        </div>
        
        <h3 className="text-xl font-bold tracking-tight mb-3 line-clamp-1">{hotel.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.map(amenity => (
            <div key={amenity} className="flex items-center text-[11px] font-medium px-2 py-1 rounded-md bg-secondary/40 text-secondary-foreground border border-white/5">
              <CheckCircle2 className="w-3 h-3 mr-1 text-primary" />
              {amenity}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto flex items-end justify-between border-t border-white/5">
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1">Starting from</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-foreground">${hotel.price}</span>
            <span className="text-sm text-muted-foreground">/ night</span>
          </div>
        </div>
        
        <Button size="sm" className="rounded-xl px-5 shadow-primary/20 shadow-lg group-hover:bg-primary/90 transition-all font-bold">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
