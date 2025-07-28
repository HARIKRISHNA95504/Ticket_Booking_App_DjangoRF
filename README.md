# Ticket_Booking_App_DjangoRF
Bus Ticket Booking App Using Django Rest Framework
# Create a Virtual Environment
* command
```
py -m venv nameofenv
```
```
PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django> py -m venv aenv
```
* To acivate virtual environment
```
PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django> .\aenv\Scripts\activate  
```
* out put
```
(aenv) PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django>
```
# Django Installation 
# step 1:
```
pip install django
```
# to install django rest framework
```
(aenv) PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django> pip install djangorestframework
```
```

```
# To create a Django Project
```
django-admin startproject projectname
```
```
(aenv) PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django> django-admin startproject travels
```
* create a app
```
py manage.py startapp appName
```
```
(aenv) PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django\travels> py manage.py startapp bookings
```
# Super User Creation
```
(aenv) PS C:\Users\HARIKRISHNA\Desktop\Travells_Fullstack_Project\django\travels> py manage.py createsuperuser
Username (leave blank to use 'harikrishna'): Harikrishna
Email address: patimaharikrishnap@gmail.com
Password:@20FH1a0596
Password (again):@20FH1a0596 
Superuser created successfully.
```
* After that register the models in the admin.py file

```
from django.contrib import admin
from .models import Bus,Seat
# Register your models here.
admin.site.register(Bus)
admin.site.register(Seat)
```
