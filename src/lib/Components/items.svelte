<script>
    let { item } = $props();
</script>

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
                                Description: {item.description}
                        </div>
                        <div>
                                Price: {item.price}
                        </div>
                        Warnings : {item.warnings}
                </div>
        </div>
</div>

<style>
        .shop-items {
                display: flex;
                border: 3px solid #78999a;
                background-color: rgb(34, 34, 34);
                color: white;
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
</style>
