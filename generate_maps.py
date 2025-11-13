#!/usr/bin/env python3
import folium
from folium import PolyLine, Marker
import os

# Ensure images directory exists
os.makedirs('images', exist_ok=True)

# Define locations with coordinates
locations = {
    'Windhoek': (-22.5597, 17.0832),
    'Sossusvlei': (-24.7268, 15.2934),
    'Swakopmund': (-22.6792, 14.5272),
    'Damaraland': (-20.5, 14.5),
    'Etosha': (-18.8556, 16.3293)
}

# Create main route map
m = folium.Map(location=[-22.5, 17.0], zoom_start=6, tiles='OpenStreetMap')

# Add markers with labels
for name, coords in locations.items():
    folium.Marker(
        coords,
        popup=f'<b>{name}</b>',
        tooltip=name,
        icon=folium.Icon(color='red', icon='info-sign')
    ).add_to(m)

# Add route polyline
route_coords = [
    locations['Windhoek'],
    locations['Sossusvlei'],
    locations['Swakopmund'],
    locations['Damaraland'],
    locations['Etosha'],
    locations['Windhoek']
]
PolyLine(route_coords, color='blue', weight=4, opacity=0.7, popup='Route').add_to(m)

# Save interactive HTML map
m.save('images/route_map.html')
print("✓ Generated route_map.html")

# Generate individual segment maps
segments = [
    ('Windhoek → Sossusvlei', [locations['Windhoek'], locations['Sossusvlei']], 'windhoek_sossusvlei.html'),
    ('Sossusvlei → Swakopmund', [locations['Sossusvlei'], locations['Swakopmund']], 'sossusvlei_swakopmund.html'),
    ('Swakopmund → Damaraland', [locations['Swakopmund'], locations['Damaraland']], 'swakopmund_damaraland.html'),
    ('Damaraland → Etosha', [locations['Damaraland'], locations['Etosha']], 'damaraland_etosha.html'),
    ('Etosha → Windhoek', [locations['Etosha'], locations['Windhoek']], 'etosha_windhoek.html'),
]

for title, coords, filename in segments:
    # Calculate center
    lat_center = sum(c[0] for c in coords) / len(coords)
    lon_center = sum(c[1] for c in coords) / len(coords)

    m_seg = folium.Map(location=[lat_center, lon_center], zoom_start=8, tiles='OpenStreetMap')

    # Add markers for start and end
    folium.Marker(coords[0], popup='Start', icon=folium.Icon(color='green')).add_to(m_seg)
    folium.Marker(coords[-1], popup='End', icon=folium.Icon(color='red')).add_to(m_seg)

    # Add route line
    PolyLine(coords, color='blue', weight=4, opacity=0.7).add_to(m_seg)

    m_seg.save(f'images/{filename}')
    print(f"✓ Generated {filename}")

print("\n✓ All maps generated successfully!")
