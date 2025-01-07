<script>
    export let data;
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';
    import Locations from '../../lib/Components/locations.svelte';

    let map;

    async function geocodeCity(cityname) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityname)}&format=json`
        );
        const result = await response.json();

        if (result && result.length > 0) {
            return { lat: parseFloat(result[0].lat), lon: parseFloat(result[0].lon) };
        }
        console.error(`Geocoding failed for city: ${cityname}`);
        return null;
    }

    async function initializeMap() {
        const { Map, TileLayer, Marker, icon } = await import('leaflet');

        map = new Map('map').setView([48.5, 8.5],5);

        new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (data && data.locations) {
            for (const location of data.locations) {
                const coords = await geocodeCity(location.cityname);

                if (coords) {
                    const customIcon = icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Custom marker icon
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                    });

                    new Marker([coords.lat, coords.lon], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(`<b>${location.cityname || 'Unknown City'}</b>`);
                }
            }
        }
    }

    onMount(() => {
        initializeMap();
    });
</script>

<h1 class="text-center mb-4">Our Locations</h1>

<div id="map" style="height: 400px; border-radius: 8px; overflow: hidden;"></div>

<div class="locations-container">
    {#if data && data.locations}
        {#each data.locations.sort((a, b) => a.cityname.localeCompare(b.cityname)) as location, i}
            {#if i === 0 || data.locations[i - 1].cityname !== location.cityname}
                <h2 class="city-title">{location.cityname}</h2>
            {/if}
            <div class="card shadow">
                <Locations {location} />
                </div>
        {/each}
    {:else}
        <p>No locations available.</p>
    {/if}
</div>

<style>
    /* Map styling */
    #map {
        width: 100%;
        height: 300px; /* Reduced height */
        margin-bottom: 2rem;
        border-radius: 8px;
        overflow: hidden;
    }

    /* Locations container */
    .locations-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    .card-body {
        padding: 1.5rem;
    }

    .card-title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #333;
    }

    .card-text {
        font-size: 1rem;
        color: #555;
    }

    /* City title styling */
    .city-title {
        grid-column: 1 / -1; /* Make it span the full width of the grid */
        margin-top: 2rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: #444;
        text-align: left;
    }

    /* Responsive padding for smaller screens */
    @media (max-width: 768px) {
        .locations-container {
            padding: 1rem;
        }
    }
</style>
