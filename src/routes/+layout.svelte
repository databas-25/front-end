<script>
	import "../app.css";
	import Modal from '../components/Modal.svelte';
	let loggedIn = false;
	let authModalOpen = false;
	const TYPES = {
		LOGIN: 1,
		REGISTER: 2
	}
	let authModalType = TYPES.LOGIN;

	function openMenu() {
		menuOpen = true;
		setTimeout(() => document.addEventListener('click', closeMenu), 10)
	}

	function closeMenu() {
		menuOpen = false;
		document.removeEventListener('click', closeMenu)
	}

	let menuOpen = false;
</script>

<div>
	<div class="flex select-none justify-between border-b-2 border-slate-400 p-2 align-baseline">
		<div class="text-2xl">
			<p><i class="bi bi-fan"></i>nly <span class="text-4xl text-sky-500" style="font-family: 'Yesteryear'">Fans</span></p>
		</div>
		<div class="flex gap-4">
			<div class="relative">
				<div class="relative h-10 aspect-square">
					<div class="absolute right-0 w-full overflow-hidden rounded border-2 border-slate-500 px-4 py-1 text-center flex align-baseline justify-evenly cursor-pointer hover:bg-slate-100" on:click={menuOpen? closeMenu: openMenu} on:keydown={() => {}}>
						<span class="leading-[26px]"></span>
						<i class="bi bi-list-task text-xl leading-7"></i>
					</div>
				</div>
				<div class="{menuOpen? '': 'invisible'} absolute right-0 w-60 overflow-clip rounded-lg border-2 border-slate-400 bg-white group-hover:visible cursor-pointer">
					<div class="p-2 hover:bg-slate-200">
						<p>Profil</p>
					</div>
					<div class="p-2 hover:bg-slate-200">
						<p>Kundvagn</p>
					</div>
					<hr/>
					{#if loggedIn}
						<div class="p-2 hover:bg-slate-200">
							<p>Logga ut</p>
						</div>
					{:else}
						<div class="p-2 hover:bg-slate-200" on:click={() => {authModalType = TYPES.LOGIN; authModalOpen = true;}} on:keydown={() => {}}>
							<p>Logga in</p>
						</div>
						<div class="p-2 hover:bg-slate-200" on:click={() => {authModalType = TYPES.REGISTER; authModalOpen = true;}} on:keydown={() => {}}>
							<p>Registrera</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div>
		<slot />
	</div>
	{#if authModalOpen}
		<Modal on:close={() => authModalOpen = false}>
			
			<h2 slot="header" class="text-xl">{authModalType == TYPES.LOGIN? 'Logga in': 'Registrera'}</h2>
			<div class="p-2">
				<p>E-postadress</p>
				<input type="text" class="input-text"/>
				<p class="mt-2">Lösenord</p>
				<input type="password" class="input-text"/>
				{#if authModalType == TYPES.REGISTER}
					<p class="mt-2">Bekräfta lösenord</p>
					<input type="password" class="input-text"/>
				{/if}
			</div>
		</Modal>
	{/if}
</div>
