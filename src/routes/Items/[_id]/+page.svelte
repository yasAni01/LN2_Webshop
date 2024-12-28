<script>
    export let data; // Access data from server-side load function
</script>

{#if data.item}
    <!-- Ensure the image path has the correct prefix -->
    <img class="img-fluid" src={"/" + data.item.image_file_path} alt={data.item.name} />
    <h1>{data.item.name}</h1>
    <p>Price: ${data.item.price}</p>
    <p>{data.item.description}</p>
{:else}
    <p>Item not found.</p>
{/if}
