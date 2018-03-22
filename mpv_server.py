from http.server import HTTPServer, BaseHTTPRequestHandler
from subprocess import Popen

# Listen for get request to the server and always expect a
# video request. (simple and stupid, but working)
class MpvServer(BaseHTTPRequestHandler):
  def do_GET(self):
    # self.path[4:] is ugly way to get first parameter value (but works..)
    Popen(["mpv", "-vo", "gpu", self.path[4:]]) # external player mpv (dont wait)
    self.send_response_only(200) # send response 200 back even if mpv failed
    self.end_headers()

if __name__ == '__main__':
  # if port/localhost is changed, make sure to also change it in background.js
  HTTPServer(('', 7381), MpvServer).serve_forever()