<script lang="ts">
	import "../app.css";
	import Modal from '@components/Modal.svelte';
	import { loginAttempted, user, validUser } from '@stores/user_store';
	import { modalOpen } from "~/stores/modal_store";
	import post from '~/script/web';
	import { onMount } from "svelte";

	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { add } from "lodash";

	const ACCESS = {
		ADMIN: [
			"/products"
		],
		LOGGED_IN: [
			"/profile"
		]
	}

	const STATES = {
		AUTHORIZING: 0,
		AUTHORIZED: 1,
		UNAUTHORIZED: 2,
	}

	let state = STATES.AUTHORIZING;
	let hasAccessToPage = true;
	let permission = 0;
	let username = '';

	const adds = [
		'https://i.insider.com/4fd0d4f36bb3f72d61000008?width=600&format=jpeg&auto=webp',
		'https://myrussianbrides.net/wp-content/uploads/2020/03/russian-woman-for-marriage.jpg',
		//'https://i.insider.com/4fcf84c06bb3f70a06000002?width=600&format=jpeg&auto=webp'
	]

	$: {

		if (ACCESS.ADMIN.includes($page.url.pathname)) {
			hasAccessToPage = state == STATES.AUTHORIZED && permission >= 10
		} else if (ACCESS.LOGGED_IN.includes($page.url.pathname)) {
			hasAccessToPage = state == STATES.AUTHORIZED;
		} else {
			hasAccessToPage = true;
		}

		if (state != STATES.AUTHORIZING && !hasAccessToPage) {
			if (browser) {
				goto('/');
			} else {
				onMount(() => goto('/'));
			}
		}
	}

	new Promise((resolve) => {
		loginAttempted.subscribe((l) => {if(l) {resolve(l)}});
	}).then(() => {
		user.subscribe((u) => {
			if (validUser(u)) {
				username = u.user_name;
				permission = u.permission;
				state = STATES.AUTHORIZED;
			} else {
				username = '';
				permission = 0;
				state = STATES.UNAUTHORIZED;
			}
		});
	});
	const TYPES = {
		LOGIN: 1,
		REGISTER: 2,
	}

	const MESSAGES = {
		EMPTY: '',
		INVALID_EMAIL: 'Felaktig e-postadress',
		INVALID_USERNAME: 'Felaktig användarnamn',
		INVALID_PASSWORD: 'Felaktig lösenord',
		NON_MATCHING_PASS: 'Lösenorden stämmer inte överrens',
		USERNAME_TAKEN: 'Användarnamnet är upptaget',
		UNKNOWN_ERROR: 'Ett oväntat fel har inträffat',
		LOGIN_FAILED: 'Inloggningen misslyckades',
	}

	let authModalOpen = false;
	let authModalType = TYPES.LOGIN;

	modalOpen.subscribe(({ open, type }) => {
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
		document.removeEventListener('click', closeMenu);
	}

	function submitAuthModal(e: MouseEvent) {
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

	function submitLogin(e: MouseEvent) {
		if (validateLogin()) {
			post(
				'sign_in',
				authForm,
				(d) => {
					authModalOpen = false;
					user.set(d.user)
					globalThis.localStorage.setItem('auth_token', d.token);
				},
				(e) => {
					authErrorMessage = MESSAGES.LOGIN_FAILED;
				},
			)
		}
	}

	function submitRegister(e: MouseEvent) {
		if (validateRegister()) {
			post(
				'sign_up',
				authForm,
				(d) => {
					authModalOpen = false;
					user.set(d.user)
					globalThis.localStorage.setItem('auth_token', d.token)
				},
				(e) => {
					switch (e.responseJSON.message) {
						case 'duplicate_keys':
							authErrorMessage = MESSAGES.USERNAME_TAKEN;
							break;
						default:
							authErrorMessage = MESSAGES.UNKNOWN_ERROR;
							break;
					}
				},
			)
		}
	}

	function logout() {
		window.localStorage.removeItem('auth_token');
		user.set(null);
	}

	onMount(() => {
		const token = window.localStorage.getItem("auth_token");
		if (token) {
			post(
				'token_sign_in',
				{ token },
				(d) => {
					loginAttempted.set(true);
					user.set(d.user);
				},
				() => {
					window.localStorage.removeItem("auth_token");
				},
			);
		}
	})

	let menuOpen = false;
</script>

<div class="max-w-screen overflow-x-hidden">
	<div class="flex select-none justify-between border-b-2 border-slate-400 p-2 align-baseline">
		<div class="text-2xl">
			<a href="/">
				<p><i class="bi bi-fan"></i>nly <span class="text-4xl text-sky-500" style="font-family: 'Yesteryear'">Fans</span></p>
			</a>
		</div>
		<div>
			logged in as: {username}
		</div>
		<div class="flex gap-4">
			<div class="relative">
				<div class="relative h-10 aspect-square">
					<div class="absolute right-0 w-full overflow-hidden rounded border-2 border-slate-500 px-4 py-1 text-center flex align-baseline justify-evenly cursor-pointer hover:bg-slate-100" on:click={menuOpen? closeMenu: openMenu} on:keydown={() => {}}>
						<span class="leading-[26px]"></span>
						<i class="bi bi-list-task text-xl leading-7"></i>
					</div>
				</div>
				<div class="{menuOpen? '': 'invisible'} absolute z-10 right-0 w-60 overflow-clip rounded-lg border-2 border-slate-400 bg-white group-hover:visible cursor-pointer">
					{#if permission >= 10}
						<a href="/products">
							<div class="p-2 hover:bg-slate-200">
								<p>Products</p>
							</div>
						</a>
					{:else}
						<a href="/profile">
							<div class="p-2 hover:bg-slate-200">
								<p>Profile</p>
							</div>
						</a>
						<a href="/cart">
							<div class="p-2 hover:bg-slate-200">
								<p>Shopping cart</p>
							</div>
						</a>
					{/if}
					<hr/>
					{#if state == STATES.AUTHORIZED}
						<div class="p-2 hover:bg-slate-200" on:click={logout} on:keydown={() => {}}>
							<p>Logout</p>
						</div>
					{:else}
						<div class="p-2 hover:bg-slate-200" on:click={() => {modalOpen.set({open: true, type: TYPES.LOGIN})}} on:keydown={() => {}}>
							<p>Login</p>
						</div>
						<div class="p-2 hover:bg-slate-200" on:click={() => {modalOpen.set({open: true, type: TYPES.REGISTER})}} on:keydown={() => {}}>
							<p>Register</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-[1fr_25rem] max-2xl:grid-cols-1 mx-auto py-2">
		{#if hasAccessToPage}
			<slot />
		{:else if state == STATES.AUTHORIZING}
			<p>Authorizing...</p>
		{:else if state == STATES.UNAUTHORIZED}
			<p>Not logged in</p>
		{/if}
		<a class="h-80 my-2 border-2 rounded max-2xl:hidden relative" href="/">
			<div class="flex justify-between absolute top-0 w-full text-white bg-gray-600 bg-opacity-50">
				<p class="relative">
					<span class="text-red-500 relative">
						Hot
						<svg class="absolute top-0 left-0 w-full h-full z-10 stroke-red-500">
							<line x1="10%" y1="20%" x2="90%" y2="80%"/>
						</svg>
					</span>
					<span class="absolute text-cyan-600 top-full left-3 bg-black bg-opacity-50 -rotate-12">Cool</span> russian girls in your area
				</p>
				<div class="w-6 aspect-square flex justify-center align-baseline text-black bg-gray-300 rounded-lg">
					<i class="bi bi-x"></i>
				</div>
			</div>
			<img src={adds[Math.floor(Math.random() * adds.length)]} class="w-full h-full object-scale-down bg-black" alt=""/>
			<div>
				<img src="fan.png" class="absolute top-16 left-0 w-32 -scale-x-100 -rotate-12" alt=""/>
				<img src="fan.png" class="absolute top-20 right-0 w-28 rotate-12" alt=""/>
			</div>
		</a>
	</div>
	{#if authModalOpen}
		<Modal on:close={() => modalOpen.set({open: false, type: TYPES.LOGIN})}>
			<h2 slot="header" class="text-xl">{authModalType == TYPES.LOGIN? 'Login': 'Register'}</h2>
			<div class="p-2">
				<p class="mt-2">Username</p>
				<input type="text" class="input-text" name="username" bind:value={authForm.username}/>
				{#if authModalType == TYPES.REGISTER}
					<p class="mt-2">Email</p>
					<input type="text" class="input-text" name="email" bind:value={authForm.email}/>
				{/if}
				<p class="mt-2">Password</p>
				<input type="password" class="input-text" name="password" bind:value={authForm.password}/>
				{#if authModalType == TYPES.REGISTER}
					<p class="mt-2">Confirm password</p>
					<input type="password" class="input-text" name="conf_password" bind:value={authForm.confPassword}/>
				{/if}
				<div class="flex justify-end">
					<button
						type="button"
						class="bg-sky-600 py-2 px-3 mt-5 rounded text-white"
						on:click={submitAuthModal}
					>
						{authModalType == TYPES.LOGIN? 'Login': 'Register'}
					</button>
				</div>
			</div>
			{#if authErrorMessage != MESSAGES.EMPTY}
				<p class="text-red-600">{authErrorMessage}</p>
			{/if}
			<p></p>
		</Modal>
	{/if}
</div>
