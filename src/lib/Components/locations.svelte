<script>
    export let location;
</script>

<div class="location-card">
    <div class="location-details">
        <h2 class="location-title">{location.cityname}</h2>
        <p class="location-info">
            <strong>Address:</strong> {location.adress}
        </p>
        <p class="location-info">
            <strong>County:</strong> {location.County}
        </p>
    </div>
</div>

<style>
    .location-card {
        padding: 1.5rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .location-card:hover {
        transform: translateY(-5px);
    }

    .location-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333333;
        margin-bottom: 1rem;
    }

    strong {
        color: #222222;
    }
</style>
