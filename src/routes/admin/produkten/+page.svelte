<script>


    let { data, form  } = $props();

    let products = $state(data.products);

    $effect(() => {
        products = data.products;
    });

</script>

<a 
    href="/admin/newProduct" 
    class="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
>
     Neues Produkt
</a>

{#if products.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
        {#each products as product}
            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
                <div class="aspect-w-4 aspect-h-3 w-full bg-gray-100">
                    <img src={product.image} alt={product.name} class="object-cover w-full h-full" />
                </div>
                <div class="p-6 flex-1 flex flex-col">
                    <h2 class="text-xl font-bold mb-2 text-gray-900 truncate">{product.name}</h2>
                    <p class="text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                    <div class="mt-auto flex items-center justify-between">
                        <span class="text-green-600 font-semibold text-lg">${product.price}</span>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-150">Details</button>
                    </div>
                </div>
            </div>


            <form action="?/delete" method="POST">
    <input type="hidden" name="id" value={product.id}>
    <button type="submit" class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition-colors duration-150">
        Löschen
    </button>
</form>
{#if form}
    {#if form.success}
        <p class="text-red-500">delete successfully</p>
    {/if}
{/if}

        {/each}
    </div>
{:else}
    <p class="text-gray-500 italic mt-4">Keine Produkte gefunden.</p>
{/if}



