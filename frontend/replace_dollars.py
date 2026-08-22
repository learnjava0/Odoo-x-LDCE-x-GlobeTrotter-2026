import re
import os

files = [
    'src/pages/DashboardPage.jsx',
    'src/pages/MyTripsPage.jsx',
    'src/pages/ItineraryBuilderPage.jsx',
    'src/pages/ItineraryViewPage.jsx',
    'src/pages/BudgetPage.jsx',
    'src/pages/CalendarPage.jsx',
    'src/pages/ActivitySearchPage.jsx',
    'src/pages/CitySearchPage.jsx',
    'src/pages/PublicTripPage.jsx'
]

for filename in files:
    if not os.path.exists(filename): continue
    
    with open(filename, 'r') as f:
        content = f.read()
        
    # Replace >$ with >₹
    content = re.sub(r'>\$', '>₹', content)
    # Replace > $ with > ₹
    content = re.sub(r'>\s*\$', '> ₹', content)
    # Replace budget: '$ with budget: '₹
    content = re.sub(r"budget:\s*'\$", "budget: '₹", content)
    # Replace \$[0-9] (e.g. $1,200 in static text, though covered if follows >)
    content = re.sub(r'(?<!`)\$([0-9])', r'₹\1', content)
    
    with open(filename, 'w') as f:
        f.write(content)
