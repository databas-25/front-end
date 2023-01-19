<script>
    import "../app.css";
</script>

<style>
    .navbar{
        background-color: grey;
        padding: 10px;
        display: grid;
        grid-template-columns: 100px 1fr 100px; /*fr works in relation to itself, like parts*/
    }

    .MainIcon {
        background-color: rgb(150, 150, 150);
        width: 100%;
    }

    .toolbar{
        float: right;
        margin-left: 10px;
        display:flex;
        justify-content: space-evenly;

    }

    .cart{
        width: 60px;
    }

    @media screen and (max-width: 600px){
        .navbar {
            grid-template-columns: 75px 1fr;
        }
    }
</style>

<div class="navbar">
    <div class="MainIcon">
        <img src="lion.webp">
    </div>
    <div class="toolbar">
        <div>n1</div>
        <div>n2</div>
        
    </div>
    <div class="cart">
        <img src="shopping-cart.webp">
    </div>
</div>

<slot />