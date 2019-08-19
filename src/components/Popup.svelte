<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let title = '';
  let body = '';

  function addNote() {
    dispatch('note', {
      title: title,
      body: body
    });
  }

  function closeModal() {
    dispatch('modal', {
      isOpen: false
    });
  }
</script>

<style type="text/scss">
  .modal {
    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }

    &__container {
      background-color: #fff;
      padding: 24px;
      max-width: 600px;
      width: 100%;
      border-radius: 4px;
      overflow-y: auto;
      box-sizing: border-box;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    }

    &__content {
      margin-bottom: 24px;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.8);
    }

    &__footer {
      display: flex;
      justify-content: center;
    }

    &__btn {
      border: 0;
      cursor: pointer;
      display: inline-flex;
      outline: none;
      position: relative;
      align-items: center;
      user-select: none;
      vertical-align: middle;
      justify-content: center;
      text-decoration: none;
      background-color: transparent;
      color: rgba(0, 0, 0, 0.87);
      font-size: 0.875rem;
      min-width: 64px;
      box-sizing: border-box;
      min-height: 36px;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.5;
      border-radius: 4px;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      color: #2196f3;
      padding: 8px;
      margin: 0 4px;

      &:hover {
        background-color: rgba(33, 150, 243, 0.08);
      }
    }
  }

  .note-editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 320px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    background-color: #fff;

    &__label {
      display: flex;
      flex-direction: column;
      width: 100%;
      color: #6e636b;

      &:nth-child(2) {
        margin: 16px 0 0;
      }
    }

    &__field-name {
      margin-bottom: 8px;
      font-size: 18px;
      color: currentColor;
    }

    &__input {
      display: inline-block;
      position: relative;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 2px;
      font: inherit;
      padding: 8px;
      color: currentColor;
      outline: none;
      resize: none;
    }
  }
</style>

<div class="modal">
  <div class="modal__overlay">
    <div class="modal__container">
      <main class="modal__content">
        <form class="note-editor">
          <label class="note-editor__label">
            <span class="note-editor__field-name">Title</span>
            <input type="text" class="note-editor__input" name="note_title" autocomplete="off" bind:value={title}>
          </label>
          <label class="note-editor__label">
            <span class="note-editor__field-name">Body</span>
            <textarea class="note-editor__input" name="note_body" rows="6" bind:value={body}></textarea>
          </label>
        </form>
      </main>
      <footer class="modal__footer">
        <button class="modal__btn" form="note-editor-form" type="submit" on:click|preventDefault={addNote}>Save</button>
        <button class="modal__btn" data-micromodal-close="" on:click={closeModal}>Cancel</button>
      </footer>
    </div>
  </div>
</div>