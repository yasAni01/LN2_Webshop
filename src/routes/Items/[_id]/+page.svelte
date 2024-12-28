<script>
    export let data; // Access data from server-side load function
    let item = data.item; // Assign item from data

    console.log(item); // Log the item to verify the data
</script>

<!-- Display the item details -->   
<div class="item-container">
{#if item}
    <div class="item-container">
        <div class="item-image">
            <img class="img-fluid" src="/{item.image_file_path}" alt="{item.name}" />
        </div>
        <div class="item-details">
            <h1>{item.name}</h1>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
            <p> Warning: {item.warnings}</p>
            <button class="btn btn-primary">Add to Cart</button>
            <button class="btn btn-secondary">Add to Favorites</button>
        </div>
    </div>
{:else}
    <p>Item not found.</p>
{/if}
</div>

<div class="item-reviews">
    <div class="reviews-header">
        <h2>Reviews</h2>
        <button class="btn btn-secondary" on:click={() => window.location.href = `/Items/${item._id}/create`}>Write Review</button>
    </div>
    {#if item.reviews && item.reviews.length > 0}
        <ul>
            {#each item.reviews as review}
                <li class="review-item">
                    <strong>{review.username}</strong> (Rating: {review.rating}/5): {review.text}
                </li>
            {/each}
        </ul>
    {:else}
        <p>No reviews yet.</p>
    {/if}
</div>

<style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
    }

    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 10px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .item-container {
        display: flex;
        align-items: flex-start;
        margin: 20px;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
    }

    .item-image {
        flex: 1;
        max-width: 600px;
        margin-right: 30px;
    }

    .item-details {
        flex: 2;
    }

    .btn {
        margin-top: 10px;
        margin-right: 10px;
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-primary {
        background-color: #007bff;
        color: #ffffff;
    }

    .btn-primary:hover {
        background-color: #0056b3;
    }

    .btn-secondary {
        background-color: #6c757d;
        color: #ffffff;
    }

    .btn-secondary:hover {
        background-color: #5a6268;
    }

    .item-reviews {
        margin-top: 30px;
        border-top: 1px solid #ddd;
        padding-top: 20px;
    }

    .item-reviews ul {
        list-style-type: none;
        padding: 0;
    }

    .item-reviews li {
        margin-bottom: 15px;
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .review-item {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .img-fluid {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
    }
</style>
