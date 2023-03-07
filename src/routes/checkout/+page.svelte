<script>
	import post from '~/script/web';
    import { updateCartAmount, user, validUser } from '~/stores/user_store';

    const STATES = {
        VERIFYING: 0,
        COMPLETE: 1,
        FAILED: 2,
    }
    let state = STATES.VERIFYING;
    user.subscribe((u) => {
        if (validUser(u)) {
            post(
                'place',
                {},
                (d) => {
                    state = d.success ? STATES.COMPLETE : STATES.FAILED;
                    updateCartAmount();
                },
                () => {
                    state = STATES.FAILED;
                },
                'order',
            )
        }
    });
</script>

{#if state == STATES.COMPLETE}
    <div class="flex flex-col justify-center text-center ">
        <i class="bi bi-check-circle-fill text-green-500 text-[100px]"></i>
        <a href="/" class="underline">Back to start</a>
    </div>
{:else if state == STATES.FAILED}
    <div class="flex flex-col justify-center text-center ">
        <i class="bi bi-x text-red-500 text-[100px]"></i>
        <a href="/" class="underline">Back to start</a>
    </div>
{:else if state == STATES.VERIFYING}
    <div class="flex flex-col justify-center text-center ">
        <p class="text-[50px]">...</p>
    </div>
{/if}