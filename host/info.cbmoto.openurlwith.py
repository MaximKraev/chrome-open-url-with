#!/usr/bin/env python
import struct
import sys
import subprocess
import simplejson
import os

text_length_bytes = sys.stdin.read(4) # Read the message length (first 4 bytes)
if len(text_length_bytes) == 0:
  sys.exit(0)

try:
  text_length = struct.unpack('I', text_length_bytes.encode('utf-8'))[0] # Unpack message length as 4 byte integer
  message = sys.stdin.read(text_length)
  json = simplejson.loads( message  ) # Read msg into JSON object
  url = json['srcUrl']
  subprocess.call(['mpv', url])
  message='{"result": "'+url+'"}'
except Exception as e:
  message='{"error": "' + str(e) + '"}' # Send a message back

sys.stdout.write(struct.pack('I', len(message))) # Write message size
sys.stdout.write(message) # Write the message itself
sys.stdout.flush()
sys.exit(0)
