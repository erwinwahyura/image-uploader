# image-uploader
simpler image-uploader to google cloud storage using authorization uuid as a token

## POST - /request-token

Create new user or return created user by email. Authorization from `uuid`

### required data
- email
- name

### return data
- User

## GET /image
Get all data of uploaded images

### required data
- authorization (header)

### return data
- [Image (populated User)]

## POST /image
Create and upload new Image or return created Image, but with new uploaded image

### required data

- authorization (header)
- file

### return data
- Image


