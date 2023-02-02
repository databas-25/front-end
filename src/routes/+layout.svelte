<script lang="ts">
	import "../app.css";
	import Modal from '@components/Modal.svelte';
	import { user } from '@stores/user_store';
	import { modalOpen } from "~/stores/modal_store";
	import jq from 'jquery';
	import { onMount } from "svelte";

	let loggedIn = false;

	user.subscribe((u) => {
		loggedIn = !!u;
	});

	const TYPES = {
		LOGIN: 1,
		REGISTER: 2
	}
	const MESSAGES = {
		EMPTY: '',
		INVALID_EMAIL: 'Felaktig e-postadress',
		INVALID_USERNAME: 'Felaktig användarnamn',
		INVALID_PASSWORD: 'Felaktig lösenord',
		NON_MATCHING_PASS: 'Lösenorden stämmer inte överrens',
		USERNAME_TAKEN: 'Användarnamnet är upptaget',
		UNKNOWN_ERROR: 'Ett oväntat fel har inträffat',
	}

	let authModalOpen = false;
	let authModalType = TYPES.LOGIN;
	modalOpen.subscribe(({open, type}) => {
		authModalOpen = open;
		authModalType = type;
	});

	const authForm = {
		username: '',
		email: '',
		password: '',
		confPassword: '',
	}
	let authErrorMessage = MESSAGES.EMPTY;

	function openMenu() {
		menuOpen = true;
		setTimeout(() => document.addEventListener('click', closeMenu), 10)
	}

	function closeMenu() {
		menuOpen = false;
		document.removeEventListener('click', closeMenu)
	}

	function submitAuthModal(e: SubmitEvent) {
		if (authModalType == TYPES.LOGIN) {
			submitLogin(e);
		} else {
			submitRegister(e);
		}
	}

	function validateLogin(): boolean {
		return true;
	}

	function validateRegister(): boolean {
		if (authForm.username.length < 3) {
			authErrorMessage = MESSAGES.INVALID_USERNAME;
			return false;
		}
		if (authForm.email.length < 8) {
			authErrorMessage = MESSAGES.INVALID_EMAIL;
			return false;
		}
		if (authForm.password.length < 6) {
			authErrorMessage = MESSAGES.INVALID_PASSWORD;
			return false;
		}
		if (authForm.password != authForm.confPassword) {
			authErrorMessage = MESSAGES.NON_MATCHING_PASS;
			return false;
		}
		return true;
	}

	function submitLogin(e: SubmitEvent) {
		if (validateLogin()) {
			jq.ajax?.({
				url: 'http://localhost:8000/user/sign_in',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(authForm),
				success: (d) => {
					authModalOpen = false;
					user.set(d.user)
					globalThis.localStorage.setItem("auth_token", d.token)
				},
				error: (e) => {
					authErrorMessage = ""
				},
			});
		}
	}

	function submitRegister(e: SubmitEvent) {
		if (validateRegister()) {
			jq.ajax?.({
				url: 'http://localhost:8000/user/sign_up',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(authForm),
				success: (d) => {
					authModalOpen = false;
				},
				error: (e) => {
					switch (e.responseJSON.message) {
						case 'duplicate_keys':
							authErrorMessage = MESSAGES.USERNAME_TAKEN;
							break;
						default:
							authErrorMessage = MESSAGES.UNKNOWN_ERROR;
							break;
					}
				},
			});
		}
	}

	function logout() {
		window.localStorage.removeItem('auth_token');
		user.set(null);
	}

	onMount(() => {
		const token = window.localStorage.getItem("auth_token");
		if (token) {
			jq.ajax?.({
				url: 'http://localhost:8000/user/token_sign_in',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					token
				}),
				success: (d) => {
					user.set(d.user);
				},
				error: () => {
					window.localStorage.removeItem("auth_token");
				},
			});
		}
	})

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
					
					<a href="/test">
						<div class="p-2 hover:bg-slate-200">
							<p>Profil</p>
						</div>
					</a>
					<a href="/cart">
						<div class="p-2 hover:bg-slate-200">
							<p>Kundvagn</p>
						</div>
					</a>
					<hr/>
					{#if loggedIn}
						<div class="p-2 hover:bg-slate-200" on:click={logout} on:keydown={() => {}}>
							<p>Logga ut</p>
						</div>
					{:else}
						<div class="p-2 hover:bg-slate-200" on:click={() => {modalOpen.set({open: true, type: TYPES.LOGIN})}} on:keydown={() => {}}>
							<p>Logga in</p>
						</div>
						<div class="p-2 hover:bg-slate-200" on:click={() => {modalOpen.set({open: true, type: TYPES.REGISTER})}} on:keydown={() => {}}>
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
		<Modal on:close={() => modalOpen.set({open: false, type: TYPES.LOGIN})}>
			
			<h2 slot="header" class="text-xl">{authModalType == TYPES.LOGIN? 'Logga in': 'Registrera'}</h2>
			<form class="p-2" on:submit={submitAuthModal}>
				<p class="mt-2">Användarnamn</p>
				<input type="text" class="input-text" name="username" bind:value={authForm.username}/>
				{#if authModalType == TYPES.REGISTER}
					<p class="mt-2">E-postadress</p>
					<input type="text" class="input-text" name="email" bind:value={authForm.email}/>
				{/if}
				<p class="mt-2">Lösenord</p>
				<input type="password" class="input-text" name="password" bind:value={authForm.password}/>
				{#if authModalType == TYPES.REGISTER}
					<p class="mt-2">Bekräfta lösenord</p>
					<input type="password" class="input-text" name="conf_password" bind:value={authForm.confPassword}/>
				{/if}
				<div class="flex justify-end">
					<input
						type="submit"
						class="bg-sky-600 py-2 px-3 mt-5 rounded text-white"
						name="submit"
						value={authModalType == TYPES.LOGIN? 'Logga in': 'Registrera'}
					/>
				</div>
			</form>
			{#if authErrorMessage != MESSAGES.EMPTY}
				<p class="text-red-600">{authErrorMessage}</p>
			{/if}
			<p></p>
		</Modal>
	{/if}
</div>
