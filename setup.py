import os

os.system("echo Set up starts now")

os.system("echo Installing python dependencies")
os.system("pip3 install pipenv")
os.system("pipenv install")
os.system("echo python dependencies installation completed")

os.system("echo Setting up flask environment")
os.system("cd ./src/Services")
os.system("export FLASK_APP=endpoints.py")
os.system("echo Flask environmentn setup completed")

os.system("cd ./reactjs")
os.system("echo Installing react dependencies")
os.system("npm install")

os.system("cd ..")
os.system("echo setup has completed")
os.system("echo Goodbye")