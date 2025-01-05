<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import Items from '$lib/Components/items.svelte';

    export let data;

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

    let chart;

    // Calculate statistics
    let totalItems = data.items.length;
    let meanPrice = (data.items.reduce((sum, item) => sum + item.price, 0) / totalItems).toFixed(2);
    let meanReview = (data.items.reduce((sum, item) => sum + (item.reviews ? item.reviews.length : 0), 0) / totalItems).toFixed(2);

    onMount(() => {
        const ctx = document.getElementById('priceChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.items.map(item => item.name),
                datasets: [{
                    label: 'Item Prices',
                    data: data.items.map(item => item.price),
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 5,

                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price in $'
                        }
                        
                    }
                }
            }
        });
    });
</script>

<div class="welcome">
    <h1>Welcome to Our Store!</h1>
    <p>Discover our curated recommendations and find something you love!</p>
</div>

<h2>Recommended Items</h2>

<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
        {#each groupedItems as group, groupIndex}
            <div class="carousel-item {groupIndex === 0 ? 'active' : ''}">
                <div class="item-group">
                    {#each group as item}
                        <Items {item} />
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


<div class="statistics">

<h2>Our Statistics</h2>
<canvas id="priceChart" width="1000" height="400"></canvas>

    <p><strong>Total Items:</strong> {totalItems}</p>
    <p><strong>Mean Price:</strong> ${meanPrice}</p>
    <p><strong>Mean Review:</strong> {meanReview}</p>
</div>

<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
    }

    .welcome {
        text-align: center;
        padding: 40px 20px;
        margin-bottom: 40px;
        background: linear-gradient(90deg, #ff7e5f, #feb47b);
        color: white;
        border-radius: 12px;
    }

    .welcome h1 {
        font-size: 3.5rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .welcome p {
        font-size: 1.5rem;
        margin: 0;
    }

    h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #444;
    }

    .carousel-inner {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .carousel-item.active {
        display: block;
    }

    .carousel-item {
        display: none;
        text-align: center;
        padding: 30px;
    }

    .item-group {
        display: flex;
        justify-content: center;
        gap: 30px;
    }

    Items {
        max-width: 350px;
        width: 350px;
        height: 450px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease-in-out;
    }

    Items:hover {
        transform: translateY(-10px);
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }

    .carousel-control-prev-icon::before,
    .carousel-control-next-icon::before {
        display: none;
    }

    .carousel-control-prev,
    .carousel-control-next {
        width: auto;
        height: auto;
    }

    #priceChart {
        margin: 40px auto;
        display: block;
        max-width: 1000px;
    }

    .statistics {
        text-align: center;
        font-size: 1.2rem;
        margin-top: 20px;
        background-color: rgba(208, 138, 174, 0.345);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);


    }

  
</style>