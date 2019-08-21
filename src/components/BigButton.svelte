<script>
  export let icon;
  export let action;
</script>

<style type="text/scss">
  .page-header__button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
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

<button
  class="action action--primary page-header__button"
  on:click
  data-action={action}>
  <i class="material-icons action__icon action__icon--large">{icon}</i>
</button>
