<script>
  import { notes } from "./stores.js";

  import Header from "./components/Header.svelte";
  import NoteItem from "./components/NoteItem.svelte";
  import Popup from "./components/Popup.svelte";
  import shortid from "shortid";

  let isOpen = false;

  let notes_value = [];
  const unsubscribe = notes.subscribe(value => {
    notes_value = [...value];
  });

  const prefix = {
    query: ""
  };

  $: filteredNotes = prefix.query
    ? notes_value.filter(
        note =>
          note.body.toLowerCase().includes(prefix.query.toLowerCase()) ||
          note.title.toLowerCase().includes(prefix.query.toLowerCase())
      )
    : notes_value;

  function handleAddNote(event) {
    notes.update(arr => {
      const id = shortid.generate();
      const priority = "LOW";
      const { title, body } = event.detail;
      const result = [...arr, { id, title, body, priority }];
      const locale = localStorage
        ? localStorage.setItem("key-note", JSON.stringify(result))
        : false;
      return result;
    });
    isOpen = false;
  }

  function openHandle(event) {
    isOpen = event.detail.isOpen;
  }

  function filterNotes(event) {
    prefix.change = false;
    prefix.query = event.detail.value.toLowerCase();
  }

  function handleDeleteNote(event) {
    const { id } = event.detail;
    notes.update(arr => {
      const result = [...arr.filter(e => e.id !== id)];
      const locale = localStorage
        ? localStorage.setItem("key-note", JSON.stringify(result))
        : false;
      return result;
    });
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
  <Header on:search={filterNotes} on:modal={openHandle} />

  <main class="container">
    <ul class="note-list">
      {#each filteredNotes as { id, title, body, priority }, i (id)}
        <NoteItem {id} {title} {body} {priority} on:delete={handleDeleteNote} />
      {/each}
    </ul>
  </main>

  {#if isOpen}
    <Popup on:note={handleAddNote} on:modal={openHandle} />
  {/if}
</div>
