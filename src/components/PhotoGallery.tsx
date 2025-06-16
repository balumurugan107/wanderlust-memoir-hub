
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Plus } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  caption: string;
  tags: string[];
}

interface PhotoGalleryProps {
  photos: Photo[];
  onAddPhoto: () => void;
}

const PhotoGallery = ({ photos, onAddPhoto }: PhotoGalleryProps) => {
  if (photos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Memory Wall
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Camera className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No photos yet</p>
          <Button onClick={onAddPhoto} className="bg-sunset-600 hover:bg-sunset-700">
            <Plus className="h-4 w-4 mr-2" />
            Add First Photo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Memory Wall ({photos.length} photos)
        </CardTitle>
        <Button onClick={onAddPhoto} size="sm" className="bg-sunset-600 hover:bg-sunset-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Photo
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
            >
              <img 
                src={photo.url} 
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-3 text-white">
                  <p className="text-sm font-medium line-clamp-2">{photo.caption}</p>
                  {photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {photo.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-white/20 px-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoGallery;
