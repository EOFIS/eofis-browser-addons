#!/usr/bin/python -u

# Note that running python with the `-u` flag is required on Windows,
# in order to ensure that stdin and stdout are opened in binary, rather
# than text, mode.

import json
import sys
import struct
import subprocess

sys.path.insert(0,"../../../../../")

# Read a message from stdin and decode it.
def get_message():
    raw_length = sys.stdin.buffer.read(4)

    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode("utf-8")
    return json.loads(message)

# Encode a message for transmission, given its content.
def encode_message(message_content, type_='status'):
    encoded_content = json.dumps({"type": type_, "content" : message_content}).encode("utf-8")
    encoded_length = struct.pack('=I', len(encoded_content))
    #  use struct.pack("10s", bytes), to pack a string of the length of 10 characters
    return {'length': encoded_length, 'content': struct.pack(str(len(encoded_content))+"s",encoded_content)}

# Send an encoded message to stdout.
def send_message(encoded_message):
    sys.stdout.buffer.write(encoded_message['length'])
    sys.stdout.buffer.write(encoded_message['content'])
    sys.stdout.buffer.flush()

while True:
#run = True
#while run:
    #run=False
    message = get_message()
    #message = '''{"text":"Native messaging enables an extension to exchange messages with a native application, installed on the user's computer. The native messaging serves the extensions without additional accesses over the web."}'''
    try:
        #mjson = json.loads(message) #TypeError, message isn't json
        selected = message['text']
        send_message(encode_message(f"MESSAGE RECEIVED","status"))
        #send_message(encode_message(f"MESSAGE SUPPLEMENTAL"))
        # f"python -m arch.linux.cli -t 'Don Quixote was a very strange man who tilted at windmills' -m 'vh/t5_sm' -s"
        method = "tr_cq"
        notes = subprocess.run(["python","-m","arch.linux.cli","-t",f"{selected}", "-m", method, "-s"], stdout=subprocess.PIPE, cwd="../../../../../").stdout.decode('utf-8')
        #notes = json.loads(notes)

        send_message(encode_message(notes, "result"))
    except KeyError as e:
        send_message(encode_message(f"Could not find key ``text'' in received object: {e}"))
    except Exception as e:
        send_message(encode_message(f"Some error occured in {__file__}: {type(e)} {e}"))
