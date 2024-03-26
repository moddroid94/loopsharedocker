# LoopShare (Deprecated)
# Superseeded by OpenLoop 

Online Audio production Library Manager/Explorer

⚠️THIS IS NOT INTENDED FOR PUBLIC USAGE, NO SANITIZATION IS MADE AND SECURITY ISN'T THE CONCERT AS OF NOW⚠️

# Tech Stack

## Prod Deployment
- Docker

## Backend
- Django
- Pillow
- Gunicorn
- Nginx

## DB
- PostgreSQL

## Frontend
- TailwindCSS
- Flowbite


# Development

VSCode workspace is inside repo containing all the task inside.

### dev branch
As of now it is configured to run in a venv with requisites.txt with default db and local statics, apart node related installs as per package.json

### Main Branch
Not actually usable, just scaffold 


#### Requisites to build prod images (only for main)
> apt-get update
> apt-get install docker docker-compose

#### Compile CSS
The compiled.css file should be moved inside the app folder before build
`npx postcss styles.css -o app/compiled.css`

#### Build & Delete dev Images
`docker-compose up -d --build`
`docker-compose down` #add -v to remove volumes (DB, staticfiles)

#### Build & Delete Prod Images
`docker-compose -f docker-compose.prod.yml up -d --build`
`docker-compose -f docker-compose.prod.yml down #add -v to remove volumes (DB, staticfiles)`

#### post build prod

`docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput`

`docker-compose -f docker-compose.prod.yml exec web python manage.py makemigrations --noinput`

`docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --no-input --clear`
