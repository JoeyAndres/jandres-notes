# jandres-notes
Sticky notes module for meteor.

This thing is still in alpha, but is working great. At the moment, the use case it satisfy is that each user have a single board containing notes.

# Example
To use, simply:

```html
<template name="Main">
   {{>JandresBoard}}
</template>
```

That's it. It should take care of publishing/subscribing/retrieving the notes that is available for your own user.

# Development
At the moment, this thing is still in alpha, handling a single use case, though I would think, the biggest use case. Either way, if you have your own use case, feel free to submit it in github's issue page. I would love to generalized this thing further.

