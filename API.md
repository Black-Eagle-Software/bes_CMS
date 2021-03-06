Note that not all of the below endpoints are currently implemented.

```
#URL                    SHORT FORM      HTTP Method     Operation
/users                  /u              GET             Returns boolean to show whether user is logged in, and id of logged in user if true
/users?email=X          /u?email=X      GET             Returns the user with email of X
/users/<id>             /u/<id>         GET             Returns the user with id of <id>
/users/<id>/media       /u/<id>/m       GET             Returns all media user with id of <id> has uploaded
/users/<id>/media/a-b   /u/<id>/m/a-b   GET             Returns all user id <id> media items between a and b (for pagination)
/users/<id>/tags        /u/<id>/t       GET             Returns all tags user with id of <id> has created
/users/<id>/albums      /u/<id>/a       GET             Returns all albums user with id of <id> has created
/media                  /m              GET             Returns all public media
/media?limit=#          /m?limit=#      GET             Returns the last # public media items
/media/a-b              /m/a-b          GET             Returns all public media items between a and b (for pagination)
/media/<id>             /m/<id>         GET             Returns the media with id of <id>
/media/<id>/tags        /m/<id>/t       GET             Returns all tags for the media with id of <id>
/tags                   /t              GET             Returns all public tags
/tags?limit=#           /t?limit=#      GET             Returns the last # of public tags
/tags/a-b               /t/a-b          GET             Returns all public tags between a and b (for pagination)
/tags/<id>              /t/<id>         GET             Returns the tag with id of <id>
*There are no public albums*
/albums/<id>            /a/<id>         GET             Returns the album with id of <id>
/albums/<id>/media      /a/<id>/m       GET             Returns all the media for the album with id of <id>
/albums/<id>/media/a-b  /a/<id>/m/a-b   GET             Returns all the media for hte album with id of <id> between a and b (for pagination)

/users                  /u              POST            Add a new user and return it with an id attribute added
/users/<id>/media       /u/<id>/m       POST            Adds a new media item for user with id of <id> and returns the media with an id attribute added
/users/<id>/tags        /u/<id>/t       POST            Adds a new tag item for the user with id of <id> and returns the tag with an id attribute added
/users/<id>/albums      /u/<id>/a       POST            Adds a new album item for the user wtih id of <id> and return the album with an id attribute added

/users/<id>             /u/<id>         PUT             Updates the user with id of <id> (full)
/media/<id>             /m/<id>         PUT             Updates the media with an id of <id> (full) - ?
/tag/<id>               /t/<id>         PUT             Updates the tag with an id of <id> (full) - ?
/albums/<id>            /a/<id>         PUT             Updates the album with an id of <id> (full) - ? 

/users/<id>             /u/<id>         PATCH           Partially updates the user with id of <id> - password update?
/media/<id>             /m/<id>         PATCH           Partially updates the media with id of <id> - add tags?
/tag/<id>               /t/<id>         PATCH           Partially updates the tag with id of <id> - rename?
/albums/<id>            /a/<id>         PATCH           Partially updates the album with id of <id> - add new media?

/users/<id>             /u/<id>         DELETE          Deletes the user with id of <id>
/media/<id>             /m/<id>         DELETE          Deletes the media with an id of <id>
/tag/<id>               /t/<id>         DELETE          Deletes the tag with an id of <id>
/albums/<id>            /a/<id>         DELETE          Deletes the album with an id of <id>

#Search additions
/search?t=x+y+z         /s?t=x+y+z      GET             Search for media with tag x, y, and z
/search?s=abcd          /s?s=abcd       GET             Search for media, albums, tags with any property (i.e.: name) that includes string abcd
/search?m=<id>          /s?m=<id>       GET             Search for all albums that include media with the id of <id> (for media details?)
```