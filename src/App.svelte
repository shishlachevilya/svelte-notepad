<script>
	import Header from './components/Header.svelte';
	import NoteItem from './components/NoteItem.svelte';
	import Popup from './components/Popup.svelte';

	let isOpen = false;

	let notes = [
		{
			"id": "XWaQXcbk0",
			"title": "JavaScript essentials",
			"body": "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
			"priority": "HIGH"
		},
		{
			"id": "pkXzyRp1P",
			"title": "Refresh HTML and CSS",
			"body": "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
			"priority": "NORMAL"
		},
		{
			"id": "QMom9q4Ku",
			"title": "Get comfy with Frontend frameworks",
			"body": "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
			"priority": "NORMAL"
		},
		{
			"id": "k2k0UrjZG",
			"title": "Winter clothes",
			"body": "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
			"priority": "LOW"
		}
	];

	function newNote(event) {
		notes = [...notes, {
			id: Date.now(),
			title: event.detail.title,
			body: event.detail.body,
			priority: "LOW"
		}];

		isOpen = false;
	}

	function openHandle(event) {
		isOpen = event.detail.isOpen;
	}

	function filterNotes(event) {
		let newNotes = notes.filter(note => note.body.toLowerCase().includes(event.detail.value.toLowerCase()));
		return notes = [...newNotes];
	}
</script>

<style type="text/scss">
	.note-list {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>

<div>
	<Header on:search={filterNotes} on:modal={openHandle}></Header>

	<main class="container">
		<ul class="note-list">
			{#each notes as { id, title, body, priority }}
				<NoteItem {id} {title} {body} {priority}></NoteItem>
			{/each}
		</ul>
	</main>

	{#if isOpen}
		<Popup on:note={newNote} on:modal={openHandle}></Popup>
	{/if}
</div>
