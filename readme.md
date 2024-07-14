# Django Auth.js Template
Don't use this yet beacuse I'm still working on it and I have to migrate to the new version of next auth

cd backend
python -m venv venv
source venev/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
