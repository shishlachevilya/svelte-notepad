<script>
  import { createEventDispatcher } from "svelte";
  import BigButton from "./BigButton.svelte";

  const dispatch = createEventDispatcher();
  let src = "./images/logo.svg";
  let alt = "notepad logo";
  let value = "";

  function openEditor() {
    dispatch("modal", {
      isOpen: true
    });
  }

  function searchNotes() {
    dispatch("search", {
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
  }

  .logo {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    color: #fff;
    font-size: 26px;
  }
  .logo__link {
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  .logo:focus {
    transform: scale(1.05);
  }

  .logo__image {
    margin-right: 4px;
  }

  .search-form {
    position: relative;
  }
  .search-form__input {
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
  }
  .search-form__input:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  .search-form__input:focus {
    width: 270px;
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
</style>

<header class="page-header">
  <h1 class="logo">
    <a href="/" class="logo__link">
      <img class="logo__image" {src} {alt} width="40" />
      Notepad
    </a>
  </h1>

  <BigButton icon={'add'} action={'open-editor'} on:click={openEditor} />

  <form class="search-form">
    <input
      type="text"
      class="search-form__input"
      placeholder="Search..."
      bind:value
      on:input={searchNotes} />
    <i class="material-icons search-form__icon">search</i>
  </form>
</header>
