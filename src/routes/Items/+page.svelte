<script>
    let { data } = $props();
    import Items from '$lib/Components/items.svelte';
</script>

<h1>Regular items Buy now!</h1>
<div class="row">
    {#each data.items as item}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
        <a href={`/Items/${item._id}`} class="text-decoration-none">
            <Items {item} />
        </a>
    </div>
    {/each}
</div>
