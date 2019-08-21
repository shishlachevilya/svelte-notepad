<script>
  import Header from "./components/Header.svelte";
  import NoteItem from "./components/NoteItem.svelte";
  import Popup from "./components/Popup.svelte";
  import shortid from "shortid";
  import {getLocalNotes} from "./helpres/getLocalNotes.js";
  import {setLocalNotes} from "./helpres/setLocalNotes.js";

  let isOpen = false;

  const INITIAL_NOTES = [
    {
      id: "XWaQXcbk0",
      title: "JavaScript essentials",
      body:
          "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
      priority: "HIGH"
    },
    {
      id: "pkXzyRp1P",
      title: "Refresh HTML and CSS",
      body:
          "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
      priority: "NORMAL"
    },
    {
      id: "QMom9q4Ku",
      title: "Get comfy with Frontend frameworks",
      body:
          "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
      priority: "NORMAL"
    },
    {
      id: "k2k0UrjZG",
      title: "Winter clothes",
      body:
          "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
      priority: "LOW"
    }
  ];

  let notes = getLocalNotes() || INITIAL_NOTES;

  const prefix = {
    query: ""
  };

  $: filteredNotes = prefix.query
      ? notes.filter(note =>
          note.body.toLowerCase().includes(prefix.query.toLowerCase())
      )
      : notes;

  function newNote(event) {
    notes = [
      ...notes,
      {
        id: shortid.generate(),
        title: event.detail.title,
        body: event.detail.body,
        priority: "LOW"
      }
    ];

    isOpen = false;
    setLocalNotes(notes);
  }

  function openHandle(event) {
    isOpen = event.detail.isOpen;
  }

  function filterNotes(event) {
    prefix.change = false;
    prefix.query = event.detail.value.toLowerCase();
  }

  function handleDeleteNote(event) {
    const {id} = event.detail;
    // ссылка на notes не должна меняться, поэтому мутируем объект
    notes.splice(notes.indexOf(e => e.id === id), 1);
    setLocalNotes(notes);
  }

  function handleSaveLocal(event) {
    const {id, title, body, priority} = event.detail;
    let note = notes.find(e => e.id === id);
    Object.assign(note, {id, title, body, priority});
    setLocalNotes(notes);
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
      {#each filteredNotes as { id, title, body, priority }}
        <NoteItem
            {id}
            {title}
            {body}
            {priority}
            on:delete={handleDeleteNote}
            on:saveLocal={handleSaveLocal}/>
      {/each}
    </ul>
  </main>

  {#if isOpen}
    <Popup on:note={newNote} on:modal={openHandle}/>
  {/if}
</div>
