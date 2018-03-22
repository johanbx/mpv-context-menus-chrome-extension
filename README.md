# Mpv Context Menus
Chrome extension and python3 server that gives the user the choice to play video source on an external videoplayer called mpv.

## Usage
- Rightclick a link on page
- Rightclick selected text on page(such as a url)
- Rightclick directly the video element on page (works sometimes)
- Rightclick anywhere else to automatically find the video for you

## Installation on Linux
##### Pre requirements

###### Att latest mpv repo
```
$ sudo add-apt-repository ppa:mc3man/mpv-tests
$ sudo apt-get update
```
###### Install mpv
```
$ sudo apt install mpv
```

###### Install youtube-dl to mpv
```
$ sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
$ sudo chmod a+rx /usr/local/bin/youtube-dl
```

###### Python & Git
```
$ sudo apt install python3
$ sudo apt install git
```

##### Setup and start server
```
Select a directory to run the server in, I choose ~/Documents/
$ cd ~/Documents/
$ git clone git@gitlab.ida.liu.se:johbo462/mpv-context-menus-chrome-extension.git
$ cd mpv-context-menus-chrome-extension
$ python3 mpv_server.py
```
##### Install and activate extension on chrome
1. Open up chrome and go to chrome://extensions/
2. Check the checkbox "Developer mode"
3. Press the button "Load unpacked extension..."
4. Navigate and choose the folder ```~/Documents/mpv-context-menus-chrome-extension/``` or your own selected installation folder

##### Run at startup with crontab
In terminal, write ```$ crontab -e``` and write this at the bottom of the file:
```
@reboot ~/Documents/mpv-context-menus-chrome-extension/crontab_server.sh
```

The log will be written in a ```~/Documents/mpv-context-menus-chrome-extension/crontab_server.log```, the log can be usefull to look at if the program is not working.
 ```$ tail ~/Documents/mpv-context-menus-chrome-extension/crontab_server.log```