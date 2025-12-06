#!/usr/bin/env python3
import folium
from folium import PolyLine, Marker, FeatureGroup, Icon
from folium.plugins import MarkerCluster
import os

# Ensure images directory exists
os.makedirs('images', exist_ok=True)

# =============================================================================
# AIRPORT (start/end point)
# =============================================================================
airport = {
    'name': 'Hosea Kutako Airport (WDH)',
    'coords': (-22.4799, 17.4709),
    'details': 'International airport - vehicle pickup (Dec 24) & dropoff (Jan 6)'
}

# =============================================================================
# ACCOMMODATIONS (exact hotel locations)
# =============================================================================
accommodations = [
    {
        'name': 'Kulala Desert Lodge',
        'coords': (-24.7283, 15.7917),
        'dates': 'Dec 24-27 (3 nights)',
        'details': 'Wilderness Safaris. Private gate to Sossusvlei.',
        'booked': True
    },
    {
        'name': 'Breeze Lodge, Swakopmund',
        'coords': (-22.6792, 14.5264),
        'dates': 'Dec 27-29 (2 nights)',
        'details': 'Coastal town accommodation',
        'booked': True
    },
    {
        'name': 'Damaraland Camp (TBD)',
        'coords': (-20.4833, 14.3667),
        'dates': 'Dec 29-31 (2 nights)',
        'details': 'Property TBD. Desert elephant tracking area.',
        'booked': False
    },
    {
        'name': 'Ongava Lodge',
        'coords': (-19.0500, 15.7833),
        'dates': 'Dec 31 - Jan 1 (1 night, NYE)',
        'details': 'Private reserve bordering Etosha.',
        'booked': True
    },
    {
        'name': 'Etosha East (TBD)',
        'coords': (-18.8167, 17.0500),
        'dates': 'Jan 1-4 (3 nights)',
        'details': 'Eastern Etosha - property TBD',
        'booked': False
    },
    {
        'name': 'Zannier Hotels Omaanda',
        'coords': (-22.5833, 17.3167),
        'dates': 'Jan 4-6 (2 nights)',
        'details': 'Luxury lodge 30-45 min from airport. Final destination.',
        'booked': True
    }
]

# =============================================================================
# FUEL STATIONS
# =============================================================================
fuel_stations = [
    {
        'name': 'Solitaire',
        'coords': (-23.8925, 15.9956),
        'notes': 'Last fuel before Sossusvlei! Famous bakery. 82km from Kulala.',
        'critical': True
    },
    {
        'name': 'Walvis Bay',
        'coords': (-22.9575, 14.5053),
        'notes': 'Coastal town, full services. Fill up before heading north.',
        'critical': False
    },
    {
        'name': 'Uis',
        'coords': (-21.2167, 14.8667),
        'notes': 'CRITICAL - Last fuel for 200+ km into Damaraland!',
        'critical': True
    },
    {
        'name': 'Khorixas',
        'coords': (-20.3717, 14.9625),
        'notes': 'Alternative fuel if approaching from south.',
        'critical': False
    },
    {
        'name': 'Outjo',
        'coords': (-20.1167, 16.1500),
        'notes': 'CRITICAL - Last fuel before Etosha! Fill completely.',
        'critical': True
    },
    {
        'name': 'Otjiwarongo',
        'coords': (-20.4636, 16.6481),
        'notes': 'Major town on return route. Good for lunch + fuel.',
        'critical': False
    },
    {
        'name': 'Okahandja',
        'coords': (-21.9833, 16.9167),
        'notes': 'Famous craft market. Last stop before Windhoek.',
        'critical': False
    }
]

# =============================================================================
# POINTS OF INTEREST
# =============================================================================
points_of_interest = [
    {
        'name': 'Sossusvlei & Deadvlei',
        'coords': (-24.7394, 15.2928),
        'type': 'Landmark',
        'notes': 'Iconic dunes & white clay pan. Enter via Kulala private gate 5AM.'
    },
    {
        'name': 'Big Daddy Dune',
        'coords': (-24.7583, 15.2917),
        'type': 'Activity',
        'notes': 'Tallest dune at 325m. Climb at sunrise before heat.'
    },
    {
        'name': 'Kuiseb Canyon',
        'coords': (-23.3333, 15.5000),
        'type': 'Photo Stop',
        'notes': 'Scenic canyon viewpoint. Brief stop on way to Swakopmund.'
    },
    {
        'name': 'Moonscape',
        'coords': (-22.9167, 14.8333),
        'type': 'Photo Stop',
        'notes': 'NASA Mars rover testing site. Otherworldly landscape.'
    },
    {
        'name': 'Cape Cross Seal Colony',
        'coords': (-21.7583, 13.9500),
        'type': 'Must See',
        'notes': '100,000+ Cape fur seals! Entry €10/pp. Prepare for smell!'
    },
    {
        'name': 'Twyfelfontein (UNESCO)',
        'coords': (-20.5983, 14.3731),
        'type': 'UNESCO',
        'notes': '6,000-year-old rock engravings. Optional day trip €60.'
    },
    {
        'name': 'Burnt Mountain',
        'coords': (-20.5500, 14.4167),
        'type': 'Landmark',
        'notes': 'Volcanic slag heap near Twyfelfontein.'
    },
    {
        'name': 'Okaukuejo Waterhole',
        'coords': (-19.1742, 15.9172),
        'type': 'Wildlife',
        'notes': 'Famous floodlit waterhole in western Etosha.'
    },
    {
        'name': 'Namutoni Waterhole',
        'coords': (-18.8000, 16.9333),
        'type': 'Wildlife',
        'notes': 'Eastern Etosha. Good for leopard sightings.'
    },
    {
        'name': 'Anderson Gate (Etosha)',
        'coords': (-19.1667, 15.8500),
        'type': 'Gate',
        'notes': 'Main southern entrance to Etosha (near Ongava).'
    },
    {
        'name': 'Von Lindequist Gate',
        'coords': (-18.8500, 17.0333),
        'type': 'Gate',
        'notes': 'Eastern entrance to Etosha National Park.'
    }
]

# =============================================================================
# ROUTE SEGMENTS
# =============================================================================
routes = [
    {
        'name': 'Day 1: Airport → Kulala (350km, 5h)',
        'coords': [
            (-22.4799, 17.4709),  # Airport
            (-22.5500, 17.0833),  # Windhoek
            (-23.0833, 16.5000),  # Rehoboth
            (-23.8925, 15.9956),  # Solitaire
            (-24.7283, 15.7917)   # Kulala
        ],
        'color': '#CC6600'
    },
    {
        'name': 'Day 5: Kulala → Swakopmund (350km, 4.5h)',
        'coords': [
            (-24.7283, 15.7917),  # Kulala
            (-23.8925, 15.9956),  # Solitaire
            (-23.3333, 15.5000),  # Kuiseb Canyon
            (-22.9167, 14.8333),  # Moonscape
            (-22.9575, 14.5053),  # Walvis Bay
            (-22.6792, 14.5264)   # Swakopmund
        ],
        'color': '#E67300'
    },
    {
        'name': 'Day 7: Swakopmund → Damaraland (420km, 5-6h)',
        'coords': [
            (-22.6792, 14.5264),  # Swakopmund
            (-21.7583, 13.9500),  # Cape Cross
            (-21.2167, 14.8667),  # Uis
            (-20.4833, 14.3667)   # Damaraland
        ],
        'color': '#FF8C00'
    },
    {
        'name': 'Day 9: Damaraland → Ongava (250km, 4h)',
        'coords': [
            (-20.4833, 14.3667),  # Damaraland
            (-20.3717, 14.9625),  # Khorixas
            (-20.1167, 16.1500),  # Outjo
            (-19.0500, 15.7833)   # Ongava
        ],
        'color': '#CC6600'
    },
    {
        'name': 'Day 10: Ongava → Etosha East (200km, 4-5h)',
        'coords': [
            (-19.0500, 15.7833),  # Ongava
            (-19.1742, 15.9172),  # Okaukuejo
            (-19.0167, 16.3333),  # Halali
            (-18.8000, 16.9333),  # Namutoni
            (-18.8167, 17.0500)   # Etosha East
        ],
        'color': '#E67300'
    },
    {
        'name': 'Day 14: Etosha → Omaanda (430km, 5.5h)',
        'coords': [
            (-18.8167, 17.0500),  # Etosha East
            (-20.4636, 16.6481),  # Otjiwarongo
            (-21.9833, 16.9167),  # Okahandja
            (-22.5833, 17.3167)   # Omaanda
        ],
        'color': '#FF8C00'
    },
    {
        'name': 'Day 16: Omaanda → Airport (45min)',
        'coords': [
            (-22.5833, 17.3167),  # Omaanda
            (-22.4799, 17.4709)   # Airport
        ],
        'color': '#CC6600'
    }
]

# =============================================================================
# CREATE MAIN MAP
# =============================================================================
m = folium.Map(
    location=[-21.5, 16.0],
    zoom_start=6,
    tiles='OpenStreetMap'
)

# Feature groups for layer control
fg_hotels = FeatureGroup(name='Accommodations', show=True)
fg_fuel = FeatureGroup(name='Fuel Stations', show=True)
fg_poi = FeatureGroup(name='Points of Interest', show=True)
fg_routes = FeatureGroup(name='Route', show=True)

# Add accommodations
for i, acc in enumerate(accommodations, 1):
    color = 'gray' if not acc['booked'] else 'green'
    status = 'TBD' if not acc['booked'] else 'BOOKED'

    popup_html = f"""
    <div style="min-width: 200px">
        <h4 style="color: #CC6600; margin: 0 0 8px 0">{i}. {acc['name']}</h4>
        <p style="margin: 4px 0"><strong>{acc['dates']}</strong></p>
        <p style="margin: 4px 0">{acc['details']}</p>
        <p style="margin: 4px 0; color: {'green' if acc['booked'] else 'red'}">
            <strong>Status: {status}</strong>
        </p>
    </div>
    """

    Marker(
        acc['coords'],
        popup=folium.Popup(popup_html, max_width=300),
        tooltip=f"{i}. {acc['name']}",
        icon=Icon(color=color, icon='home', prefix='fa')
    ).add_to(fg_hotels)

# Add fuel stations
for fuel in fuel_stations:
    color = 'red' if fuel['critical'] else 'orange'
    critical_text = '⚠️ CRITICAL! ' if fuel['critical'] else ''

    popup_html = f"""
    <div style="min-width: 180px">
        <h4 style="color: {'#c00' if fuel['critical'] else '#f90'}; margin: 0 0 8px 0">
            ⛽ {fuel['name']}
        </h4>
        <p style="margin: 4px 0">{critical_text}{fuel['notes']}</p>
    </div>
    """

    Marker(
        fuel['coords'],
        popup=folium.Popup(popup_html, max_width=250),
        tooltip=f"⛽ {fuel['name']}" + (' ⚠️' if fuel['critical'] else ''),
        icon=Icon(color=color, icon='tint', prefix='fa')
    ).add_to(fg_fuel)

# Add points of interest
poi_colors = {
    'Landmark': 'blue',
    'Activity': 'purple',
    'Photo Stop': 'lightblue',
    'Must See': 'darkblue',
    'UNESCO': 'darkpurple',
    'Wildlife': 'darkgreen',
    'Gate': 'gray'
}
poi_icons = {
    'Landmark': 'mountain',
    'Activity': 'hiking',
    'Photo Stop': 'camera',
    'Must See': 'star',
    'UNESCO': 'university',
    'Wildlife': 'paw',
    'Gate': 'door-open'
}

for poi in points_of_interest:
    color = poi_colors.get(poi['type'], 'blue')
    icon = poi_icons.get(poi['type'], 'info')

    popup_html = f"""
    <div style="min-width: 180px">
        <h4 style="color: #336699; margin: 0 0 8px 0">{poi['name']}</h4>
        <p style="margin: 4px 0; font-style: italic">{poi['type']}</p>
        <p style="margin: 4px 0">{poi['notes']}</p>
    </div>
    """

    Marker(
        poi['coords'],
        popup=folium.Popup(popup_html, max_width=250),
        tooltip=f"{poi['name']} ({poi['type']})",
        icon=Icon(color=color, icon=icon, prefix='fa')
    ).add_to(fg_poi)

# Add routes
for route in routes:
    PolyLine(
        route['coords'],
        color=route['color'],
        weight=4,
        opacity=0.8,
        popup=route['name'],
        tooltip=route['name']
    ).add_to(fg_routes)

# Add airport marker (separate from accommodations)
airport_popup = f"""
<div style="min-width: 200px">
    <h4 style="color: #333; margin: 0 0 8px 0">✈️ {airport['name']}</h4>
    <p style="margin: 4px 0">{airport['details']}</p>
</div>
"""
Marker(
    airport['coords'],
    popup=folium.Popup(airport_popup, max_width=300),
    tooltip=f"✈️ {airport['name']}",
    icon=Icon(color='black', icon='plane', prefix='fa')
).add_to(m)

# Add feature groups to map
fg_routes.add_to(m)
fg_hotels.add_to(m)
fg_fuel.add_to(m)
fg_poi.add_to(m)

# Add layer control
folium.LayerControl().add_to(m)

# Add title
title_html = '''
<div style="position: fixed; top: 10px; left: 60px; z-index: 1000;
     background: white; padding: 10px 15px; border-radius: 8px;
     box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: sans-serif;">
    <h3 style="margin: 0 0 5px 0; color: #CC6600;">Namibia Family Safari</h3>
    <p style="margin: 0; font-size: 12px; color: #666;">Dec 24, 2025 - Jan 6, 2026 | 13 nights | ~2,200 km</p>
</div>
'''
m.get_root().html.add_child(folium.Element(title_html))

# Add legend
legend_html = '''
<div style="position: fixed; bottom: 30px; right: 10px; z-index: 1000;
     background: white; padding: 12px; border-radius: 8px;
     box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: sans-serif; font-size: 11px;">
    <h4 style="margin: 0 0 8px 0;">Legend</h4>
    <p style="margin: 3px 0;"><span style="color: black;">✈</span> Airport</p>
    <p style="margin: 3px 0;"><span style="color: green;">●</span> Hotel (Booked)</p>
    <p style="margin: 3px 0;"><span style="color: gray;">●</span> Hotel (TBD)</p>
    <p style="margin: 3px 0;"><span style="color: red;">●</span> CRITICAL Fuel</p>
    <p style="margin: 3px 0;"><span style="color: orange;">●</span> Fuel Station</p>
    <p style="margin: 3px 0;"><span style="color: blue;">●</span> Point of Interest</p>
</div>
'''
m.get_root().html.add_child(folium.Element(legend_html))

# Save main map
m.save('images/route_map.html')
print("✓ Generated route_map.html")

# =============================================================================
# GENERATE SEGMENT MAPS
# =============================================================================
for route in routes:
    coords = route['coords']

    # Calculate center
    lat_center = sum(c[0] for c in coords) / len(coords)
    lon_center = sum(c[1] for c in coords) / len(coords)

    m_seg = folium.Map(location=[lat_center, lon_center], zoom_start=8, tiles='OpenStreetMap')

    # Add start/end markers
    Marker(coords[0], popup='Start', icon=Icon(color='green', icon='play', prefix='fa')).add_to(m_seg)
    Marker(coords[-1], popup='End', icon=Icon(color='red', icon='flag-checkered', prefix='fa')).add_to(m_seg)

    # Add intermediate points
    for coord in coords[1:-1]:
        Marker(coord, icon=Icon(color='blue', icon='circle', prefix='fa')).add_to(m_seg)

    # Add route line
    PolyLine(coords, color=route['color'], weight=5, opacity=0.8).add_to(m_seg)

    # Add title
    title_html = f'''
    <div style="position: fixed; top: 10px; left: 60px; z-index: 1000;
         background: white; padding: 10px 15px; border-radius: 8px;
         box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: sans-serif;">
        <h4 style="margin: 0; color: #CC6600;">{route['name']}</h4>
    </div>
    '''
    m_seg.get_root().html.add_child(folium.Element(title_html))

    # Generate filename from route name
    filename = route['name'].split(':')[0].lower().replace(' ', '_') + '.html'
    m_seg.save(f'images/{filename}')
    print(f"✓ Generated {filename}")

print("\n✓ All maps generated successfully!")
print(f"  - Main map: images/route_map.html")
print(f"  - {len(routes)} segment maps")
