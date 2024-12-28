<script>
    let { data } = $props();
    import Items from '$lib/Components/items.svelte';
</script>

<h1 class="text-center mb-4">Want to add a new <em class="text-primary">Item</em>? Go ahead!</h1>
<a href="/Items/itemcreate" class="btn btn-primary btn-lg w-100 mb-4 shadow-lg hover-shadow-lg">Create New Item</a>

<h2 class="text-center mb-5">Regular items - Buy Now!</h2>

<div class="row g-4">
    {#each data.items as item}
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card shadow-lg rounded-3 overflow-hidden d-flex flex-column">
            <Items {item} />
            <div class="card-body p-4 flex-grow-1">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">{item.description}</p>
                <a href="/items/{item.id}" class="btn btn-primary w-100">Buy Now</a>
            </div>
        </div>
    </div>
    {/each}
</div>

<style>
    /* Ensure all cards are the same height */
    .card {
        border: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
    }

    .card-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    /* Ensuring cards expand and take equal height */
    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
    }

    /* Hover effect on cards */
    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #004085;
    }

    .shadow-lg {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    /* Some spacing adjustments */
    .text-primary {
        color: #007bff;
    }

    .mb-4, .mb-5 {
        margin-bottom: 1.5rem;
    }

    .w-100 {
        width: 100%;
    }
</style>
