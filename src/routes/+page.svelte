<script lang="ts">
	let iframe: HTMLIFrameElement
	let pregledaj: boolean
	let slika: HTMLInputElement
	let imageurl: string
	let naslov: string
	let yt: string

	function Dslika() {
		let reader = new FileReader()
		let file = slika.files[0]

		reader.onload = () => {
			let blob = new Blob([reader.result, { type: file.type }])
			imageurl = URL.createObjectURL(blob)
		}

		reader.readAsArrayBuffer(file)
	}

	export let data

	$: ({ web_code } = data)

	$: if (pregledaj) {
		setTimeout(() => {
			let frame = iframe.contentWindow?.document

			if (frame) {
				let random = Math.floor(Math.random() * 3) + 1

				if (!naslov) {
					naslov = "Ovo je moj video!"
				}

				if (!yt) {
					yt = "Moj kanal"
				}

				frame.querySelector("#dialog.ytd-consent-bump-v2-lightbox").style.display = "none"
				frame.querySelector("tp-yt-iron-overlay-backdrop.opened").style.display = "none"

				let em = frame.querySelector("ytd-rich-item-renderer:nth-of-type(" + random + ")")

				em.querySelector("yt-formatted-string a").innerHTML = yt
				em.querySelector("#tooltip").innerHTML = yt
				em.querySelector("#video-title").innerHTML = naslov
				em.querySelector(".ytd-thumbnail span").innerHTML = " 69:69 "
				em.querySelector(".ytd-thumbnail img").setAttribute("src", imageurl)
			}
		}, 1000)
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<iframe srcdoc={web_code} bind:this={iframe} style:display={pregledaj ? "block" : "none"} />

{#if !pregledaj}
	<form>
		<label>Odaberi sliku:</label>
		<input type="file" on:change={Dslika} bind:this={slika} />
		{#if imageurl}
			<img src={imageurl} alt="Thumbnail" />
		{/if}
		<label>Naslov videja:</label>
		<input type="text" bind:value={naslov} />
		<label>Ime kanala:</label>
		<input type="text" bind:value={yt} />
		<button
			on:click={() => {
				pregledaj = !pregledaj
			}}>Pregledaj</button
		>
	</form>
{:else}
	<button
		on:click={() => {
			location.reload()
		}}>Opet?</button
	>
{/if}

<style>
	iframe {
		display: block;
		margin: 0px auto;
		width: 80%;
		height: 80vh;
	}

	label {
		display: block;
		margin: 10px 0px;
	}

	img {
		display: block;
		max-width: 300px;
		margin: 10px 0px;
	}
</style>
