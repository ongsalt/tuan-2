# TODO
- [ ] templating
    - [ ] get path of the node that access a signal 
    - [ ] auto update
    - [ ] if/else
    - [ ] loop
- [ ] bind:this
- [ ] vite plugin 
    - [ ] allow direct component import
    - [ ] transpile ts

## Low priority
- [ ] Key
- [ ] Component
- [ ] scoped css

# Template
svelte-like
- 

# Notes
- parse html template first becuase of bind:this
- parset html template to some kind of nested templateEffect
- templateEffect should take currentNode into account
- how tf do i 
    - implement Key
    - implement component props binding 
```html
<script lang="ts">
    let desciription = signal("sdjfhgiu")
</script>

<main>
    <h1> Title </h1>
    <p>description: {description.value}</p>
</main>
```
into (mostly copied from svelte)
```ts
const root = $.template(`<main> <h1>Title</h1> <p> </p> <main/>`)
function component($$context) {
    let desciription = signal("sdjfhgiu")

    let node = root() // The node here might be a wrapper of an HTMLElement 
    let text = $.at(node, [0, 1])

    $.templateEffect(() => {
        // Look like svelte will use $.get instead of direct .value access
        // this might have something to do with current component scope or something 
        $.setText(text, `description: ${description.value}`)
    })

    $.append($$context.anchor, node)
}
```

- name collision
    - just prefix every thing with __generated\_\_ or $