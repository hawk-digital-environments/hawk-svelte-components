<script module>
  import { Card } from "$lib";
  import { defineMeta } from "@storybook/addon-svelte-csf";


  const { Story } = defineMeta({
    title: "Handson/Card",
    component: Card,
    tags: ["autodocs"],
    argTypes: {
      liked: { control: { type: "boolean" } },
      likesCount: {control: { type: "number" }},
      bookmarked: { control: { type: "boolean" } },
      authors: [
        {
          control: { type: "object" },
        },
      ],
      text: {
        control: { type: "text" },
      },
      imageSrc: {
        control: { type: "text" },
      },
      imageAlt: {
        control: { type: "text" },
      },
      heading: {
        control: { type: "text" },
      },
      address: {
        control: { type: "text" },
      },

    },
    args: {
      liked: false,
      bookmarked: false,
      authors: [
        {
          name: "Prof. Dr. Annika Schmidt",
          src: "https://avatar.iran.liara.run/public/76",
        },
        {
          name: "Jamalo Tayaro",
          src: "https://avatar.iran.liara.run/public/26",
        },
        {
          name: "Miguel Gonzales",
          src: "https://avatar.iran.liara.run/public/90",
        },
        {
          name: "Sara Polierta",
          src: "https://avatar.iran.liara.run/public/12",
        },
        {
          name: "Franziska Müller",
          src: "https://avatar.iran.liara.run/public/42",
 
        },
      ],
      heading: "Neues Projekt für nachhaltige Architektur",
      address: "Goschentor 1, 31134 Hildesheim",
      imageSrc: "https://picsum.photos/400/200",
      imageAlt : "Bildbeschreibung",
      text: "Dieses Projekt beschäftigt sich mit innovativen Ansätzen für nachhaltige Architektur und Campusentwicklung an der HAWK.",
      likesCount: 12
    },
  });
</script>

<Story name="Generic" args={{}}>
  {#snippet children({ ...args })}
    <Card
    heading={args.heading ?? ""}
      text={args.text ?? ""}
      address={args.address ?? ""}
      imageSrc={args.imageSrc ?? ""}
      imageAlt={args.imageAlt ?? ""}
      authors={args.authors ?? []}
      liked={args.liked}
      likesCount={args.likesCount}
      bookmarked={args.bookmarked}
     
    ></Card>
  {/snippet}
</Story>
