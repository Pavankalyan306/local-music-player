# backend/app.py
from flask import Flask, jsonify, send_from_directory, request, abort
from flask_cors import CORS
import os
from mutagen import File as MFile
from mutagen.easyid3 import EasyID3

MUSIC_DIR = os.path.join(os.path.dirname(__file__), 'music')
ALLOWED_EXT = ('.mp3', '.flac', '.wav', '.m4a', '.ogg')

app = Flask(__name__, static_folder=None)
CORS(app)


def scan_music():
    tracks = []
    for root, _, files in os.walk(MUSIC_DIR):
        for f in files:
            if f.lower().endswith(ALLOWED_EXT):
                full = os.path.join(root, f)
                rel = os.path.relpath(full, MUSIC_DIR).replace('\\', '/')
                meta = {'id': len(tracks), 'file': rel, 'title': os.path.splitext(f)[0], 'artist': None, 'album': None, 'duration': None}
                try:
                    audio = MFile(full)
                    if audio:
                        # title/artist/album using common tags
                        tags = {}
                        try:
                            for t in ('title','artist','album'):
                                if t in audio.tags:
                                    tags[t] = audio.tags.get(t)
                        except Exception:
                            pass
                        # Mutagen returns lists — normalize
                        for k in ('title','artist','album'):
                            val = None
                            if audio.tags is not None and k in audio.tags:
                                v = audio.tags.get(k)
                                if isinstance(v, (list, tuple)):
                                    val = v[0]
                                else:
                                    val = str(v)
                            if val:
                                meta[k] = val
                        # duration
                        try:
                            if hasattr(audio.info, 'length'):
                                meta['duration'] = int(audio.info.length)
                        except Exception:
                            pass
                except Exception as e:
                    app.logger.debug('mutagen fail: %s', e)
                tracks.append(meta)
    return tracks


@app.route('/api/tracks')
def api_tracks():
    tracks = scan_music()
    return jsonify({'tracks': tracks})


@app.route('/stream/<path:filename>')
def stream_file(filename):
    # Secure path inside MUSIC_DIR
    full = os.path.join(MUSIC_DIR, filename)
    if not os.path.isfile(full):
        abort(404)
    # send file (browser will play it)
    return send_from_directory(MUSIC_DIR, filename, conditional=True)


@app.route('/api/cover/<path:filename>')
def cover(filename):
    # If you have cover images next to audio (e.g. .jpg), this can serve them; fallback: 404
    full = os.path.join(MUSIC_DIR, filename)
    if not os.path.isfile(full):
        abort(404)
    return send_from_directory(MUSIC_DIR, filename, conditional=True)


if __name__ == '__main__':
    os.makedirs(MUSIC_DIR, exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
