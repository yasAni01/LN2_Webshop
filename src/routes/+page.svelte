<script>
    let { data } = $props();
    import Items from '$lib/Components/items.svelte';

    // Shuffle the array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Get 4 random items
    let randomItems = shuffle(data.items).slice(0, 4);
</script>

<h1>Recommended items!</h1>

<div id="carouselExampleFade" class="carousel slide carousel-fade">
    <div class="carousel-inner">
        {#each randomItems as item, index}
            <div class="carousel-item {index === 0 ? 'active' : ''}">
                <Items {item}></Items>
            </div>
        {/each}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

<style>
    .carousel-item {
        text-align: center;
        max-width: 300px; /* Adjust the size of the item card */
        margin: 0 auto; /* Center the item card */
    }
    .carousel-item img {
        display: block;
        margin: 0 auto; /* Center the image */
        max-width: 100%; /* Ensure the image fits within the item card */
        max-height: 200px; /* Adjust the height as needed */
    }
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        background-color: black;
    }
    .carousel-control-prev-icon::before,
    .carousel-control-next-icon::before {
        background-color: black;
    }
</style>
