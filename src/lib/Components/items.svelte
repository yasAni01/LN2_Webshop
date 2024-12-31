<script>
    export let item;
</script>

<a href={`/Items/${item._id}`} class="text-decoration-none">
    <div class="shop-items">
        <div class="shop-item">
            <div class="image-container">
                <img class="img-fluid" src={item.image_file_path} alt={item.name} />
            </div>
            <div class="details">
                <div class="title">
                    {item.name}
                </div>
                <div>
                </div>
                <div>
                    Price: {item.price}
                </div>
            </div>
        </div>
    </div>
</a>

<style>
    .shop-items {
        display: flex;
        border: 3px solid rgb(124, 108, 214);
        color: rgb(56, 70, 81);
        padding: 5px;
        height: 100%;
        margin: 5px;
    }
    .shop-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
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
    .text-decoration-none {
        text-decoration: none;
    }
</style>
