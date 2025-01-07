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
                <p class="card-text">{item.description}</p>                
                <a href="/Items/{item._id}" class="btn btn-primary w-100">Buy Now</a>
            </div>
        </div>
    </div>
    {/each}
</div>



<style>
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

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

</style>
