import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from destinations.models import Destination

def get_unsplash_url(keywords):
    return f"https://source.unsplash.com/800x600/?{keywords}"

def seed():
    dest_data = [
        # Existing (updating with real images)
        {"city_name": "Paris", "country": "France", "region": "Europe", "latitude": 48.8566, "longitude": 2.3522, "description": "The City of Light, offering fashion, art, and iconic landmarks like the Eiffel Tower.", "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", "cost_index": 150, "popularity_score": 98},
        {"city_name": "Tokyo", "country": "Japan", "region": "Asia", "latitude": 35.6762, "longitude": 139.6503, "description": "A bustling metropolis perfectly blending ultramodern neon-lit skyscrapers with historic temples.", "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80", "cost_index": 120, "popularity_score": 95},
        {"city_name": "New York", "country": "USA", "region": "Americas", "latitude": 40.7128, "longitude": -74.0060, "description": "The city that never sleeps, featuring Central Park, Broadway, and endless skyscrapers.", "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80", "cost_index": 200, "popularity_score": 96},
        {"city_name": "Sydney", "country": "Australia", "region": "Oceania", "latitude": -33.8688, "longitude": 151.2093, "description": "Famous for its stunning harbour, Opera House, and incredible coastal beaches.", "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80", "cost_index": 140, "popularity_score": 90},
        {"city_name": "Dubai", "country": "UAE", "region": "Middle East", "latitude": 25.2048, "longitude": 55.2708, "description": "A city of luxury shopping, ultramodern architecture and a lively nightlife scene.", "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", "cost_index": 180, "popularity_score": 92},

        # New ones
        {"city_name": "London", "country": "UK", "region": "Europe", "latitude": 51.5074, "longitude": -0.1278, "description": "A 21st-century city with history stretching back to Roman times, home to Big Ben and the Thames.", "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", "cost_index": 170, "popularity_score": 97},
        {"city_name": "Rome", "country": "Italy", "region": "Europe", "latitude": 41.9028, "longitude": 12.4964, "description": "The capital of Italy and the Roman Empire, defined by art, ruins, and vibrant street life.", "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80", "cost_index": 130, "popularity_score": 96},
        {"city_name": "Barcelona", "country": "Spain", "region": "Europe", "latitude": 41.3851, "longitude": 2.1734, "description": "Famed for its unique architecture by Gaudí and vibrant Mediterranean atmosphere.", "image": "https://images.unsplash.com/photo-1583422409516-2895a77ef244?auto=format&fit=crop&w=800&q=80", "cost_index": 110, "popularity_score": 94},
        {"city_name": "Amsterdam", "country": "Netherlands", "region": "Europe", "latitude": 52.3676, "longitude": 4.9041, "description": "Known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades.", "image": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80", "cost_index": 125, "popularity_score": 93},
        
        {"city_name": "Kyoto", "country": "Japan", "region": "Asia", "latitude": 35.0116, "longitude": 135.7681, "description": "Famous for its numerous classical Buddhist temples, gardens, imperial palaces, and wooden houses.", "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", "cost_index": 110, "popularity_score": 92},
        {"city_name": "Bangkok", "country": "Thailand", "region": "Asia", "latitude": 13.7563, "longitude": 100.5018, "description": "A sprawling metropolis known for ornate shrines and vibrant street life.", "image": "https://images.unsplash.com/photo-1508009603885-50cf7cbf79be?auto=format&fit=crop&w=800&q=80", "cost_index": 50, "popularity_score": 91},
        {"city_name": "Singapore", "country": "Singapore", "region": "Asia", "latitude": 1.3521, "longitude": 103.8198, "description": "An island city-state off southern Malaysia known for high-end commerce and spectacular greenery.", "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80", "cost_index": 150, "popularity_score": 90},
        {"city_name": "Bali", "country": "Indonesia", "region": "Asia", "latitude": -8.4095, "longitude": 115.1889, "description": "An Indonesian island known for its forested volcanic mountains, iconic rice paddies, and coral reefs.", "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80", "cost_index": 60, "popularity_score": 98},

        {"city_name": "Cape Town", "country": "South Africa", "region": "Africa", "latitude": -33.9249, "longitude": 18.4241, "description": "A port city on South Africa’s southwest coast, nestled below the iconic Table Mountain.", "image": "https://images.unsplash.com/photo-1523321528657-4589f81da75d?auto=format&fit=crop&w=800&q=80", "cost_index": 80, "popularity_score": 88},
        {"city_name": "Marrakech", "country": "Morocco", "region": "Africa", "latitude": 31.6295, "longitude": -7.9811, "description": "A former imperial city in western Morocco, home to intricate mosques, palaces, and gardens.", "image": "https://images.unsplash.com/photo-1597212618440-806262de4f6a?auto=format&fit=crop&w=800&q=80", "cost_index": 65, "popularity_score": 85},

        {"city_name": "Rio de Janeiro", "country": "Brazil", "region": "Americas", "latitude": -22.9068, "longitude": -43.1729, "description": "A huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches.", "image": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80", "cost_index": 85, "popularity_score": 89},
        {"city_name": "Buenos Aires", "country": "Argentina", "region": "Americas", "latitude": -34.6037, "longitude": -58.3816, "description": "Argentina’s big, cosmopolitan capital city, known for its Plaza de Mayo and tango dancing.", "image": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80", "cost_index": 70, "popularity_score": 86},
        {"city_name": "Los Angeles", "country": "USA", "region": "Americas", "latitude": 34.0522, "longitude": -118.2437, "description": "A sprawling Southern California city uniquely known for Hollywood and the entertainment industry.", "image": "https://images.unsplash.com/photo-1518115277180-87a3cbdd5157?auto=format&fit=crop&w=800&q=80", "cost_index": 190, "popularity_score": 93},
        {"city_name": "Cancun", "country": "Mexico", "region": "Americas", "latitude": 21.1619, "longitude": -86.8515, "description": "A Mexican city on the Yucatán Peninsula bordering the Caribbean Sea, known for its beaches.", "image": "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=800&q=80", "cost_index": 110, "popularity_score": 91},

        {"city_name": "Queenstown", "country": "New Zealand", "region": "Oceania", "latitude": -45.0312, "longitude": 168.6626, "description": "A resort town in Otago in the south-west of New Zealand's South Island.", "image": "https://images.unsplash.com/photo-1601058268499-e5223abefeb4?auto=format&fit=crop&w=800&q=80", "cost_index": 140, "popularity_score": 88},
        {"city_name": "Istanbul", "country": "Turkey", "region": "Europe/Asia", "latitude": 41.0082, "longitude": 28.9784, "description": "A major city in Turkey that straddles Europe and Asia across the Bosphorus Strait.", "image": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80", "cost_index": 75, "popularity_score": 90},
    ]

    for d in dest_data:
        obj, created = Destination.objects.update_or_create(
            city_name=d["city_name"],
            defaults={
                "country": d["country"],
                "region": d["region"],
                "latitude": d["latitude"],
                "longitude": d["longitude"],
                "description": d["description"],
                "image": d["image"],
                "cost_index": d["cost_index"],
                "popularity_score": d["popularity_score"],
            }
        )
    print(f"Successfully seeded {len(dest_data)} diverse cities!")

if __name__ == '__main__':
    seed()
