import sys,io,json,urllib.request,os,tarfile
sys.path.insert(0,'/app/node_modules/.fx/pil')
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
ids=open('/app/node_modules/.fx_s.sh').read().split('ids="')[1].split('"')[0].split(',')
m=json.load(open('/app/node_modules/.fx/mapa.json'))
out='/app/node_modules/.fx/out'; os.makedirs(out,exist_ok=True)
jobs={}
for l,n,i,c,a in m: jobs[n]=(i,c)
def run(item):
    n,(i,c)=item
    im=Image.open(io.BytesIO(urllib.request.urlopen(f'https://media.base44.com/images/public/6ac90b58b627d4d678c3ad09/{ids[i]}_generated_image.png',timeout=90).read())).convert('RGB')
    w,h=im.size; s=min(w,h); x=(w-s)//2; y=(h-s)//2
    if c: x+=int(c[0]*s); y+=int(c[1]*s); s=int(c[2]*s)
    im.crop((x,y,x+s,y+s)).resize((480,480),Image.LANCZOS).save(f'{out}/{n}.jpg',quality=80,optimize=True,progressive=True)
    return n
with ThreadPoolExecutor(16) as ex: done=list(ex.map(run,jobs.items()))
with tarfile.open('/app/node_modules/.fx/fotos.tar','w') as t:
    for n in sorted(jobs): t.add(f'{out}/{n}.jpg',arcname=f'{n}.jpg')
print(len(done),os.path.getsize('/app/node_modules/.fx/fotos.tar'))
