import os
import pyxhook
import random
from os import path, listdir
import re

continuous = False
last_key = None

enter_path = ''
space_path = ''
others_paths = []

sounds_dir = '~/Downloads/sounds'
files = listdir(sounds_dir)

enter_re = re.compile('^enter\.(mp3|wav)$')
space_re = re.compile('^space\.(mp3|wav)$')
other_re = re.compile('^.+\.(mp3|wav)$')

for file in files:
    if re.match(enter_re, file) != None:
        enter_path = file
    elif re.match(space_re, file) != None:
        space_path = file
    elif re.match(other_re, file) != None:
        others_paths.append(file)

if not enter_path or not space_path or len(others_paths) == 0:
  print('Couldn\'t parse sounds.')
  exit()


def KeyDownHandle(event):
    global continuous, last_key

    sound = '~/Downloads/sounds'

    if event.Key == 'space':
        sound = path.join(sound, space_path)
    elif event.Key == 'Return':
        sound = path.join(sound, enter_path)
    else:
        rand_index = random.randint(0, len(others_paths) - 1)
        sound = path.join(sound, others_paths[rand_index])

    if not continuous or event.Key != last_key:
        last_key = event.Key
        os.system(f'play {sound} 2> /dev/null &')
        continuous = True


def KeyUpHandle(event):
    global continuous
    continuous = False


hook = pyxhook.HookManager()
hook.KeyDown = KeyDownHandle
hook.KeyUp = KeyUpHandle
hook.HookKeyboard()

hook.start()
