<script>
    export let items = [];
</script>


{#each items as item}
    <div class="item">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
    </div>
{/each}


<div class="shop-items">
    {#each items as item}
        <div class="shop-item">
            <div>
                <img class="img-fluid" src={item.image} alt={item.name} />
            </div>
            <div class="details">
                <div class="title">
                    {item.name}
                </div>
                <div>
                    Description: {item.description}
                </div>
                <div>
                    Price: ${item.price}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .shop-items {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .shop-item {
        border: 1px solid #555;
        background-color: #444;
        color: white;
        width: calc(33.333% - 10px);
        box-sizing: border-box;
    }
    .details {
        padding: 0.5em;
    }
    .title {
        font-weight: bold;
    }
    .img-fluid {
        max-width: 100%;
        height: auto;
    }
</style>

