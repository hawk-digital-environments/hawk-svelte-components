<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import {Icon, AvatarList} from "$lib"
    import style from './Card.module.sass';
    

    interface Props extends HTMLAttributes<HTMLDivElement> {
        /**
         * Image source URL for the card.
         */
        imageSrc?: string;

        /**
         * Image alt text for accessibility.
         */
        imageAlt?: string;

        /**
         * Address-Object for the card.
         * !To be discussed. GPS, street, room, link to map?
         * !For now: It's just a string.
         */
        address?: string;

        /**
         * heading of the card
         */
         heading: string;

        /**
         * Text-content of the card
         */
        text: string;

        /**
         * A list of authors of the content
         * !For now: Each author is an object with a name and an ImageURL
         */
        authors: Array<{ name: string; src: string }>;

        /**
         * Number of likes
         */
        likesCount?: number;

        /**
         * Like-Status of the card for the logged-in user
         */
        liked?: boolean;

        /**
         * Bookmark-Status of the card for the logged-in user
         */
        bookmarked?: boolean;
    }

    let {
        imageSrc,
        imageAlt,
        heading,
        address,
        text,
        authors,
        liked,
        likesCount,
        bookmarked,
    }: Props = $props();

</script>

<article class={style.card} aria-label={heading}>
    <div class={style.card_image_container}>
        <img src={imageSrc} alt={imageAlt} class={style.card_image} />
        <button
            type="button"
            class={style.image_overlay_btn}
            aria-label="Aktion auf dem Bild"
        >
        <Icon icon="eye" size="small" class={style.icon} />
             private
        </button>
    </div>
    <header>
        <h2 class={style.card_title}>{heading}</h2>
        <address class={style.card_address}>{address}</address>
    </header>
    <section class={style.card_content}>
        <p>{text}</p>
    </section>
    <footer class={style.card_footer}>
        <ul class={style.authors} aria-label="Autor:innen">
            <AvatarList avatars={authors}></AvatarList>
        </ul>
        <div class={style.card_actions}>
            <button
                type="button"
                aria-pressed={liked}
                class={style.like_btn}
                aria-label={liked ? "Dislike" : "Like"}
            >
            <Icon aria-hidden="true" icon={"heart"} type={liked ? "filled" : "outline"} ></Icon>
            {likesCount}
            </button>
            <button
                type="button"
                aria-pressed={bookmarked}
                class={style.bookmark_btn}
           
                aria-label={bookmarked
                    ? "Lesezeichen entfernen"
                    : "Lesezeichen setzen"}
            >
            <Icon aria-hidden="true" icon={"save"} type={bookmarked ? "filled" : "outline"} ></Icon>
            
            </button>
        </div>
    </footer>

</article>

