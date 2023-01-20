<script>
	import "../app.css";
</script>

<div>
	<div class="flex select-none justify-between border-b-2 border-slate-400 p-2 align-baseline">
		<div class="text-2xl">
			<p>Page title</p>
		</div>
		<div class="flex gap-4">
			<div class="group relative w-40">
				<div class="relative h-10">
				<div class="absolute right-0 w-full overflow-hidden rounded border-2 border-slate-500 px-4 py-1 text-center flex align-baseline justify-evenly">
					<span class="leading-[26px]">Hover me</span>
					<i class="bi bi-list-task text-xl leading-7"></i>
				</div>
				</div>
				<div class="invisible absolute right-0 w-60 overflow-clip rounded-lg border-2 border-slate-400 bg-white group-hover:visible">
					<div class="p-2 hover:bg-slate-200">
						<p>Alternativ 1</p>
					</div>
					<div class="p-2 hover:bg-slate-200">
						<p>Alternativ 2</p>
					</div>
					<div class="p-2 hover:bg-slate-200">
						<p>Alternativ 3</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<slot />
	</div>
</div>
  
