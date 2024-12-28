<script>
    export let data; // Access data from server-side load function
    let item = data.item; // Assign item from data

    console.log(item); // Log the item to verify the data
</script>

{#if item}
    <div class="item-container">
        <div class="item-image">
            <img class="img-fluid" src="/{item.image_file_path}" alt="{item.name}" />
        </div>
        <div class="item-details">
            <h1>{item.name}</h1>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
            <button class="btn btn-primary">Add to Cart</button>
            <button class="btn btn-secondary">Add to Favorites</button>
        </div>
    </div>
{:else}
    <p>Item not found.</p>
{/if}

<div class="item-reviews">
    <h2>Reviews</h2>
    {#if item.reviews && item.reviews.length > 0}
        <ul>
            {#each item.reviews as review}
                <li>
                    <strong>{review.author}</strong>: {review.content}
                </li>
            {/each}
        </ul>
    {:else}
        <p>No reviews yet.</p>
    {/if}
    <button class="btn btn-secondary" on:click={() => window.location.href = `/Items/${item._id}/create`}>Write Review</button>
</div>

<style>
    .item-container {
        display: flex;
        align-items: flex-start;
    }
    .item-image {
        flex: 2;
        max-width: 800px;
        margin-right: 20px;
    }
    .item-details {
        flex: 2;
    }
    .btn {
        margin-top: 10px;
        margin-right: 10px;
    }
    .btn {
        margin-top: 10px;
        margin-right: 10px;
    }
    .item-reviews {
        margin-top: 20px;
    }
    .item-reviews ul {
        list-style-type: none;
        padding: 0;
    }
    .item-reviews li {
        margin-bottom: 10px;
    }
</style>
