<script lang="ts">
  import style from "./switch.module.css";
  import classNames from "classnames";

  interface Props {
    checked?: boolean;
    disabled?: boolean;
  }

  const { checked = false, disabled = false }: Props = $props();
</script>

<input type="checkbox" role="switch" {checked} />
