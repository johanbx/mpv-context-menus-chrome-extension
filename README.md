# Mpv Context Menus
Chrome extension and python3 server that gives the user the choice to play video source on an external videoplayer called mpv.

# Installation on Linux
##### Pre requirements

```
$ sudo apt install mpv
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
1. Open up chrome and go to [chrome://extensions/](chrome://extensions/)
2. Check the checkbox "developer mode"
3. Press the button "Load unpacked extension..."
4. Navigate and choose the folder ```~/Documents/mpv-context-menus-chrome-extension/```

# Usage
1. Rightclick a link on page
2. Rightclick selected text on page(such as a url)
3. Rightclick directly the video element on page (works sometimes)
4. Rightclick anywhere else to automatically find the video for you