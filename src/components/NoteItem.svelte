<script>
  import { fade } from 'svelte/transition';

  export let id = '';
  export let title = '';
  export let body = '';
  export let priority = '';
  let edit = false;
  let flag = true;

  function editNote() {
    edit = !edit;
  }

  function deleteNote({target}) {
    flag = !flag;
    // target.closest('.note-list__item').remove();
  }
</script>

<style type="text/scss">
  .edit {
    background: rgba(33, 150, 243, .5);
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

    &__content {
      padding: 14px 0;
      flex-grow: 1;
    }

    &__title {
      color: #6e636b;
      margin-top: 0;
      padding: 4px 16px;
      font-weight: 500;
    }

    &__body {
      color: #7c7879;
      margin-top: 0;
      padding: 4px 16px;
      margin-bottom: 0;
      line-height: 1.5;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-top: 1px solid #d2cccd;
    }

    &__section {
      display: flex;
      align-items: center;
    }

    &__priority {
      color: #6e636b;
      font-weight: 500;
      margin-left: 16px;
      font-size: 18px;
    }
  }

  .action {
    display: inline-flex;
    margin: 0 4px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: #7c7879;
    color: #fff;
    cursor: pointer;
    outline: none;
    user-select: none;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      background-color: #2196f3;
    }

    &:active {
      box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
      0px 12px 17px 2px rgba(0, 0, 0, 0.14),
      0px 5px 22px 4px rgba(0, 0, 0, 0.12);
    }

    &.active {
      background-color: #2196f3;
    }

    &__icon {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
    }
  }
</style>

{#if flag}
  <li class="note-list__item" data-id="{id}">
    <div class="note">
      <div class="note__content">
        <h2 class="note__title {edit ? 'edit' : ''}" contenteditable={edit}>{title}</h2>
        <p class="note__body {edit ? 'edit' : ''}" contenteditable={edit}>{body}</p>
      </div>
      <footer class="note__footer">
        <section class="note__section">
          <button class="action" data-action="decrease-priority">
            <i class="material-icons action__icon">expand_more</i>
          </button>
          <button class="action" data-action="increase-priority">
            <i class="material-icons action__icon">expand_less</i>
          </button>
          <span class="note__priority">Priority: {priority}</span>
        </section>
        <section class="note__section">
          <button class="action {edit ? 'active' : ''}" data-action="edit-note" on:click={editNote}>
            {#if edit}
              <i class="material-icons action__icon">close</i>
            {:else}
              <i class="material-icons action__icon">edit</i>
            {/if}
          </button>
          <button class="action" data-action="delete-note" on:click={deleteNote}>
            <i class="material-icons action__icon">delete</i>
          </button>
        </section>
      </footer>
    </div>
  </li>
{/if}

