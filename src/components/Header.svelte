<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let src = 'https://shishlachevilya.github.io/images/logo.svg';
  let alt = 'notepad logo';
  let value = '';

  function openEditor() {
    dispatch('modal', {
      isOpen: true
    });
  }

  function searchNotes() {
    dispatch('search', {
      value: value
    });
  }
</script>

<style type="text/scss">
  .page-header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;
    margin-bottom: 32px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: #2196f3;
    z-index: 999;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

    &__button {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
    }
  }

  .logo {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    color: #fff;
    font-size: 26px;

    &__link {
      position: relative;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      font-family: inherit;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    &:hover {
      transform: scale(1.05);
    }

    &:focus {
      transform: scale(1.05);
    }

    &__image {
      margin-right: 4px;
    }
  }

  .search-form {
    position: relative;

    &__input {
      display: inline-block;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.15);
      width: 220px;
      font: inherit;
      border: 0;
      padding: 8px 32px 8px 8px;
      color: #fff;
      transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      outline: none;

      &:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }

      &:focus {
        width: 270px;
      }
    }
  }

  .search-form__icon {
    display: block;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #fff;
  }

  .search-form__input::placeholder {
    color: rgba(255, 255, 255, 0.5);
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

    &__icon {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 24px;

      &--large {
        width: 56px;
        height: 56px;
        line-height: 56px;
        font-size: 24px;
      }
    }

    &--primary {
      background-color: #e10050;

      &:hover {
        background-color: #9d0038;
      }
    }
  }
</style>

<header class="page-header">
  <h1 class="logo">
    <a href="/" class="logo__link">
      <img class="logo__image" {src} {alt} width="40" />
      Notepad
    </a>
  </h1>

  <button class="action action--primary page-header__button" data-action="open-editor" on:click={openEditor}>
    <i class="material-icons action__icon action__icon--large">add</i>
  </button>

  <form class="search-form">
    <input type="text" class="search-form__input" placeholder="Search..." bind:value={value} on:input={searchNotes}/>
    <i class="material-icons search-form__icon">search</i>
  </form>
</header>