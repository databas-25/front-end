<script>
    const SUB_TABS = {
        ACCOUNT_DETAILS: 0,
        ORDER_HISTORY: 1,
        DELETE_ACCOUNT: 99
    }
    let current_tab = SUB_TABS.ACCOUNT_DETAILS; //for order history and such
</script>

<div class="w-4/5 grid grid-cols-5 m-auto">
    <div class="border-2 border-red-600 "> <!-- div is for left side menu --> 
        <p>Order History</p>
    </div>

    <div class="border-2 border-blue-600 col-span-4 place-content-center"> <!-- div is for general menu-->
        <p>Profname</p>
        <p>mail adress</p>
        <p>change button</p>
    </div>
</div>
