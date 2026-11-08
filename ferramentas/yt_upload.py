"""Sobe um Short no YouTube (upload resumable). Uso: python3 yt_upload.py video.mp4 titulo.txt legenda.txt"""
import json, subprocess, sys, urllib.request
S = '/tmp/claude-0/-home-user/46e585c4-3619-56c9-8da8-c76aeffdff38/scratchpad/'
video, ftit, fleg = sys.argv[1:4]
tok = subprocess.check_output(['bash', S + 'blogger/youtube_token.sh'], stderr=subprocess.DEVNULL).decode().split()[-1]
titulo = open(ftit).read().strip()[:95] + ' #shorts'
desc = open(fleg).read().strip()[:4900]
meta = {'snippet': {'title': titulo, 'description': desc, 'categoryId': '26', 'defaultLanguage': 'pt-BR',
                    'tags': ['eletricista', 'eletricista barueri', 'manutenção predial', 'Itapevi', 'Barueri']},
        'status': {'privacyStatus': 'public', 'selfDeclaredMadeForKids': False}}
dados = open(video, 'rb').read()
r = urllib.request.Request('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
                           data=json.dumps(meta).encode(), method='POST',
                           headers={'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json; charset=UTF-8',
                                    'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(len(dados))})
loc = urllib.request.urlopen(r, timeout=60).headers['Location']
r2 = urllib.request.Request(loc, data=dados, method='PUT', headers={'Content-Type': 'video/mp4'})
v = json.load(urllib.request.urlopen(r2, timeout=600))
print('https://youtube.com/shorts/' + v['id'], v['status'].get('uploadStatus'))
