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

    // Get 6 random items
    let randomItems = shuffle(data.items).slice(0, 6);

    // Group items into sets of 3
    let groupedItems = [];
    for (let i = 0; i < randomItems.length; i += 3) {
        groupedItems.push(randomItems.slice(i, i + 3));
    }
</script>

<h1>Recommended items!</h1>

<div id="carouselExampleFade" class="carousel slide carousel-fade">
    <div class="carousel-inner">
        {#each groupedItems as group, groupIndex}
            <div class="carousel-item {groupIndex === 0 ? 'active' : ''}">
                <div class="item-group">
                    {#each group as item}
                        <Items {item}></Items>
                    {/each}
                </div>
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
    }
    .item-group {
        display: flex;
        justify-content: center;
        gap: 10px; /* Adjust the gap between items */
    }
    Items {
        max-width: 300px; /* Adjust the size of the item card */
        width: 300px; /* Fixed width */
        height: 400px; /* Fixed height */
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
