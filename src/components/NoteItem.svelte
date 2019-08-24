<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import Button from "./Button.svelte";

  export let id = "";
  export let title = "";
  export let body = "";
  export let priority = "";
  let edit = false;
  let flag = true;
  const dispatch = createEventDispatcher();

  function editNote() {
    edit = !edit;
    dispatch("edit", {
      id,
      body,
      title,
      priority
    });
  }

  function deleteNote({ target }) {
    flag = !flag;
    const { id } = target.closest("li").dataset;
    dispatch("delete", {
      id
    });
  }
  function increasePrioriry(params) {
    dispatch("increase", {
      id,
      priority
    });
  }
  function decreasePrioriry(params) {
    dispatch("decrease", {
      id,
      priority
    });
  }
</script>

<style>
  .edit {
    background: rgba(33, 150, 243, 0.5);
  }

  .note-list__item {
    flex: 0 0 calc(33.3333% - 16px);
    min-width: 320px;
    margin-left: 8px;
    margin-right: 8px;
  }

  .note-list__item:not(:nth-child(-n + 3)) {
    margin-top: 16px;
  }

  .note {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
  .note__content {
    padding: 14px 0;
    flex-grow: 1;
  }

  .note__title {
    color: #6e636b;
    margin-top: 0;
    padding: 4px 16px;
    font-weight: 500;
  }

  .note__body {
    color: #7c7879;
    margin-top: 0;
    padding: 4px 16px;
    margin-bottom: 0;
    line-height: 1.5;
  }

  .note__footer {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-top: 1px solid #d2cccd;
  }

  .note__section {
    display: flex;
    align-items: center;
  }

  .note__priority {
    color: #6e636b;
    font-weight: 500;
    margin-left: 16px;
    font-size: 18px;
  }
</style>

{#if flag}
  <li class="note-list__item" data-id={id}>
    <div class="note">
      <div class="note__content">
        {#if edit}
          <h2
            class="note__title edit"
            contenteditable="true"
            bind:textContent={title}>
            {title}
          </h2>
        {:else}
          <h2 class="note__title" contenteditable="false">{title}</h2>
        {/if}
        {#if edit}
          <p
            class="note__body edit"
            contenteditable="true"
            bind:textContent={body} />
        {:else}
          <p class="note__body" contenteditable="false">{body}</p>
        {/if}
      </div>
      <footer class="note__footer">
        <section class="note__section">
          <Button
            edit={false}
            icon={'expand_less'}
            action={'increase-priority'}
            on:click={increasePrioriry} />
          <Button
            edit={false}
            icon={'expand_more'}
            action={'decrease-priority'}
            on:click={decreasePrioriry} />
          <span class="note__priority">Priority: {priority}</span>
        </section>
        <section class="note__section">
          {#if edit}
            <Button
              {edit}
              icon={'close'}
              action={'edit-note'}
              on:click={editNote} />
          {:else}
            <Button
              {edit}
              icon={'edit'}
              action={'edit-note'}
              on:click={editNote} />
          {/if}
          <Button
            edit={false}
            icon={'delete'}
            action={'delete-note'}
            on:click={deleteNote} />
        </section>
      </footer>
    </div>
  </li>
{/if}
