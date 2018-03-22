# Mpv Context Menus
Chrome extension and python3 server that gives the user the choice to play video source on an external videoplayer called mpv.

# Installation on Linux
##### Pre requirements

```
$ sudo apt install mpv
$ sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
$ sudo chmod a+rx /usr/local/bin/youtube-dl
$ sudo apt install python3
$ sudo apt install git
```
##### Setup and start server

```
$ cd ~/Documents/
$ git clone git@gitlab.ida.liu.se:johbo462/mpv-context-menus-chrome-extension.git
$ cd mpv-context-menus-chrome-extension
$ python3 mpv_server.py
```
##### Install and activate extension on chrome
1. Open up chrome and go to chrome://extensions/
2. Check the checkbox "Developer mode"
3. Press the button "Load unpacked extension..."
4. Navigate and choose the folder ```~/Documents/mpv-context-menus-chrome-extension/```

##### Run at startup with crontab
In terminal, write ```$ crontab -e``` and write this at the bottom of the file:
```
@reboot cd ~/Documents/mpv-context-menus-chrome-extension/ && export DISPLAY=:0 && python3 mpv_server.py >> cronlog.log 2>&1
```
The log will be written in a new file called cronlog.log

# Usage
- Rightclick a link on page
- Rightclick selected text on page(such as a url)
- Rightclick directly the video element on page (works sometimes)
- Rightclick anywhere else to automatically find the video for you