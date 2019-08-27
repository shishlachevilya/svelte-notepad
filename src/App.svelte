<script>
  import { notes } from "./stores.js";

  import Header from "./components/Header.svelte";
  import NoteItem from "./components/NoteItem.svelte";
  import Popup from "./components/Popup.svelte";
  import shortid from "shortid";

  const PRIORITY_TYPES = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };

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

  function handleEditNote(event) {
    const { id, title, body, priority } = event.detail;
    notes.update(arr => {
      const note = arr.find(e => e.id === id);
      if (!note) return;

      function updatedNote(t, b, p) {
        note.title = t ? t : note.title;
        note.body = b ? b : note.body;
        note.priority = p ? p : note.priority;
      }

      updatedNote(title, body, priority);
      const locale = localStorage
          ? localStorage.setItem("key-note", JSON.stringify(arr))
          : false;
      return arr;
    });
  }

  function handleIncrease(event) {
    const { id, priority } = event.detail;
    notes.update(arr => {
      const note = arr.find(e => e.id === id);
      if (!note) return;
      const keys = Object.keys(PRIORITY_TYPES);

      function updatedNote(p) {
        note.priority =
            PRIORITY_TYPES[p] > 1 ? note.priority : keys[PRIORITY_TYPES[p] + 1];
      }

      updatedNote(priority);
      const locale = localStorage
          ? localStorage.setItem("key-note", JSON.stringify(arr))
          : false;
      return arr;
    });
  }

  function handleDecrease(event) {
    const { id, priority } = event.detail;
    notes.update(arr => {
      const note = arr.find(e => e.id === id);
      if (!note) return;
      const keys = Object.keys(PRIORITY_TYPES);

      function updatedNote(p) {
        note.priority =
            PRIORITY_TYPES[p] === 0 ? note.priority : keys[PRIORITY_TYPES[p] - 1];
      }

      updatedNote(priority);
      const locale = localStorage
          ? localStorage.setItem("key-note", JSON.stringify(arr))
          : false;
      return arr;
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
<Header on:search={filterNotes} on:modal={openHandle}/>

  <main class="container">
    <ul class="note-list">
      {#each filteredNotes as { id, title, body, priority }, i (id)}
        <NoteItem
            {id}
            {title}
            {body}
            {priority}
            on:increase={handleIncrease}
            on:decrease={handleDecrease}
            on:delete={handleDeleteNote}
            on:edit={handleEditNote}/>
      {/each}
    </ul>
  </main>

  {#if isOpen}
    <Popup on:note={handleAddNote} on:modal={openHandle}/>
  {/if}
</div>
