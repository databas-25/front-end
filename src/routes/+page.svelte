<script>
	import ProdCard from "./ProdCard.svelte";

</script>

<style>
    .productSection{
        display: flex;
        justify-content: right;
    }

    .productSectionSub{
        width: 80%;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* displays five products per row */
    }

    @media screen and (max-width: 700px){
        .productSection {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Visit <a href="/test">/test</a> to see hej</p>
<p class="bg-red-600 text-white">Testing</p>

<div class="productSection">
    <div class="productSectionSub">
        <ProdCard img="fan.webp" name="Noctua" price="200 sek"/>
        <ProdCard img="lion.webp" name="Simba" price="2000000 sek"/>
        <ProdCard img="fan.webp" name="Noctua" price="200 sek"/>
        <ProdCard img="lion.webp" name="Simba" price="2000000 sek"/>
        <ProdCard img="fan.webp" name="Noctua" price="200 sek"/>
        <ProdCard img="lion.webp" name="Simba" price="2000000 sek"/>
    </div>

</div>