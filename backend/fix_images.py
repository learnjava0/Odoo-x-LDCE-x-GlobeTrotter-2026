import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from destinations.models import Destination

def fix():
    fixes = {
        "Bangkok": "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=800&q=80",
        "Barcelona": "https://images.unsplash.com/photo-1539037116277-4db20d008064?auto=format&fit=crop&w=800&q=80",
        "Cape Town": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
        "Los Angeles": "https://images.unsplash.com/photo-1515896769750-31548aa180ed?auto=format&fit=crop&w=800&q=80",
        "Marrakech": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
        "Queenstown": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    }
    
    count = 0
    for city, url in fixes.items():
        obj = Destination.objects.filter(city_name=city).first()
        if obj:
            obj.image = url
            obj.save()
            count += 1
            
    print(f"Fixed {count} broken images!")

if __name__ == '__main__':
    fix()
