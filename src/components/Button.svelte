<script>
  import Icon from "./Icon.svelte";
  export let icon;
  export let action;
  export let edit;
</script>

<style>
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
  }
  .action:hover {
    background-color: #2196f3;
  }

  .action:active {
    box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
      0px 12px 17px 2px rgba(0, 0, 0, 0.14),
      0px 5px 22px 4px rgba(0, 0, 0, 0.12);
  }

  .action.active {
    background-color: #2196f3;
  }
</style>

<button class="action {edit ? 'active' : ''}" data-action={action} on:click>
  <Icon {icon} />
</button>
