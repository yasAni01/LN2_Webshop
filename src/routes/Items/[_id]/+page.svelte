<script>
    import Locations from '../../../lib/Components/locations.svelte';
    export let data;
    let item = data.item || {};
    item.locations = item.locations || [];
    let form = {};
    // Log the locations to the console for debugging
    console.log('Item locations before:', item.locations);
    // Correct the logic for filtering locations
    if (item.locationsID && data.locations) {
        item.locations = data.locations.filter(location => 
            item.locationsID.includes(location._id)
        );
    } else if (data.locations) {
        item.locations = data.locations;
    }


</script>

<div class="item-page">
    {#if item}
        <div class="item-container">
            <div class="item-image">
                <img class="img-fluid" src="/{item.image_file_path}" alt="{item.name}" />
            </div>
            <div class="item-details">
                <h1 class="item-title">{item.name}</h1>
                <p class="item-price">Price: <span>${item.price}</span></p>
                <p class="item-description">{item.description}</p>
                {#if item.reviews && item.reviews.length > 0}
                    <p class="item-rating">⭐ Average Rating: {(item.reviews.reduce((sum, review) => sum + review.rating, 0) / item.reviews.length).toFixed(1)} / 5</p>
                {:else}
                    <p class="item-rating">⭐ No ratings yet.</p>
                {/if}
                
                {#if item.cart}
                <form method="POST" action="?/removeFromCart" use:enhance>
                    <input type="hidden" name="id" value={item._id} />
                    <button class="btn btn-danger">Remove from Cart</button>
                </form>
                  
                {:else}
                  <form method="POST" action="?/addToCart" use:enhance>
                    <input type="hidden" name="id" value={item._id} />
                    <button class="btn btn-success">Add to Cart</button>
                  </form>
                {/if}




                {#if form?.success}
                    <div class="alert alert-success mt-4" role="alert">
                        <strong>Success!</strong> Item added to cart successfully!
                    </div>
                {:else if form?.error}
                    <div class="alert alert-danger mt-4" role="alert">
                        <strong>Error:</strong> {form.error}
                    </div>
                {/if}
            </div>
        </div>
        <div class="item-locations">
            <h2>Available for pickup in..</h2>
            {#if item.locations && item.locations.length > 0}
                {#each item.locations as location}
                        <div class="card">
                            <Locations {location} />
                    </div>
                {/each}
            {:else}
                <p>No pickup locations found.</p>
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
    {:else}
        <p>Item not found.</p>
    {/if}
</div>

<form method="POST" action="?/delete">
    <input type="hidden" name="id" value={item._id}>
    <button class="btn btn-danger">Delete Item</button>
  </form>
<style>
    .item-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    .item-container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        margin: 20px 0;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
    }
    .item-image {
        flex: 1;
        max-width: 500px;
        margin-right: 20px;
        overflow: hidden;
        border-radius: 12px;
    }
    .item-image img {
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: transform 0.3s ease;
        border-radius: 12px;
    }
    .item-image img:hover {
        transform: scale(1.05);
    }
    .item-details {
        flex: 2;
        padding: 20px;
    }
    .item-title {
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
    }
    .item-price {
        font-size: 1.5rem;
        color: #4caf50;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .item-price span {
        color: #e91e63; /* A soft pinkish-red for price */
    }
    .item-description {
        font-size: 1rem;
        color: #555;
        margin-bottom: 20px;
        line-height: 1.6;
    }
    .item-rating {
        font-size: 1rem;
        color: #ff9800;
        margin-bottom: 20px;
    }
    .btn {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .btn-primary {
        background-color: #007bff;
        color: #fff;
    }
    .btn-primary:hover {
        background-color: #0056b3;
    }

    .btn-secondary {
        background-color: #6c757d;
        color: #fff;
    }
    .btn-secondary:hover {
        background-color: #5a6268;
    }
    .item-locations {
        margin-top: 30px;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
    }
    .item-reviews {
        margin-top: 30px;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
    }
    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .item-reviews ul {
        list-style: none;
        padding: 0;
    }
    .review-item {
        padding: 15px;
        margin-bottom: 15px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>