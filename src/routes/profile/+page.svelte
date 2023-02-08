<script lang="ts">

    let profileName:string;
    let email:string;
    

    export{profileName, email};

    const SUB_TABS = {
        ACCOUNT_DETAILS: 0,
        ORDER_HISTORY: 1,
        DELETE_ACCOUNT: 99
    }
    let current_tab = SUB_TABS.ACCOUNT_DETAILS;

    let changePersInfo = false;

    function saveNewPersonalDetails(){
        
    }

</script>

<div class="w-4/5 grid grid-cols-5 m-auto bg-gray-200 p-1 rounded">
    <div class="rounded border-2 bg-gray-500 text-gray-300 border-black justify-evenly h-fit"> <!-- div is for left side menu --> 
        <p class="menuItem {current_tab==SUB_TABS.ACCOUNT_DETAILS? 'text-gray-200 bg-gray-700': ''}" on:click={()=>current_tab=SUB_TABS.ACCOUNT_DETAILS} on:keydown>Account Details</p>
        <p class="menuItem {current_tab==SUB_TABS.ORDER_HISTORY? 'text-gray-200 bg-gray-700': ''}" on:click={()=>current_tab=SUB_TABS.ORDER_HISTORY} on:keydown>Order History</p>
    </div>
    {#if current_tab==SUB_TABS.ACCOUNT_DETAILS}
        <div class="rounded border-2 border-black col-span-4 text-center fit-content-center h-fit grid grid-cols-4 bg-gray-300 ml-4">
            <div class="infoHeaders col-span-1">
                <p class="infoHeader">Profile name: </p>
                <p class="infoHeader">E-mail address:</p>
            </div>
            {#if changePersInfo==false}
                <div class="infoValues col-span-3">
                    <p class="infoValue">{profileName}</p>
                    <p class="infoValue">{email}</p>
                </div>
                <div class=" col-span-3"></div>
                <button class=" col-span-1 bg-red-400" on:click={()=>changePersInfo=true}>Edit</button>
            {:else}
                <div class="infoValues col-span-3">
                    <input class="infoValue" bind:value={profileName} required/> <!-- fix binding so you might not need it maybe -->
                    <input class="infoValue" bind:value={email} required/>
                </div>
                <div class=" col-span-3"></div>
                <button class=" col-span-1 bg-red-400" on:click={()=>{changePersInfo=false;saveNewPersonalDetails()}}>Save</button>
                <button class=" col-span-1 bg-red-400" on:click={()=>changePersInfo=false}>Cancel</button>
            {/if}
        </div>
    {:else if current_tab==SUB_TABS.ORDER_HISTORY}
        <div class="orderHistory rounded border-2 border-black col-span-4 text-center fit-content-center h-fit grid grid-cols-3 bg-gray-500">
            <div class="orderNames">
                <p class="orderName">A jojo</p>
                <p class="orderName">A doll</p>
                <p class="orderName">A dvd</p>
            </div>
            <div class="orderDates">
                <p class="orderDate">2002</p>
                <p class="orderDate">2003</p>
                <p class="orderDate">2006</p>
            </div>
            <div class="orderPrices ">
                <p class="orderPrice">19 sek</p>
                <p class="orderPrice">149 sek</p>
                <p class="orderPrice">98 sek</p>
            </div>
        </div>
    {:else}
        <div>
            <p>This is the else case</p>
            <p>You shouldn't be here</p>
        </div>
    {/if}
</div>

<style lang="postcss">
    .menuItem {
        @apply hover:text-white
    }

    .infoHeader:nth-child(even){
        @apply bg-gray-500
    }

    .infoHeader:nth-child(odd){
        @apply bg-gray-400
    }

    .infoValue:nth-child(even){
        @apply bg-gray-400
    }

    .infoValue:nth-child(odd){
        @apply bg-gray-500
    }

    .orderName:nth-child(even){
        @apply bg-gray-400
    }

    .orderDate:nth-child(even){
        @apply bg-gray-400
    }

    .orderPrice:nth-child(even){
        @apply bg-gray-400
    }
</style>

