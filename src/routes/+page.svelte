<script>
	import ProdCard from "./ProdCard.svelte";
    import Modal from '../components/Modal.svelte';

    const usID = 10;
    const poID = 1;
    let modalOpen = false;
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
        .productSectionSub {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>

<div class="productSection mr-10">
    <div class="productSectionSub">
        <ProdCard img="fan.webp" name="Noctua" price="200 sek" link=""/>
        <ProdCard img="lion.webp" name="Simba" price="2000000 sek" link=""/>
        <ProdCard img="fan.webp" name="Noctua" price="200 sek" link=""/>
        <ProdCard img="lion.webp" name="Simba" price="2000000 sek" link=""/>
        <ProdCard img="fan.webp" name="Noctua" price="200 sek" link=""/>
        <ProdCard img="lion.webp" name="Simba" price="2000000 sek" link=""/>
    </div>
</div>