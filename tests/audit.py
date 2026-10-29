 """Static portfolio checks. Run from repository root; Pillow inspects image headers."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import hashlib
import json
from PIL import Image

class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.ids, self.refs, self.images, self.videos, self.links = [], [], [], [], [], []
        self.headings, self.picture_sources = [], []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in {'meta', 'link', 'img', 'br', 'hr', 'source', 'input'}:
            self.stack.append(tag)
        if 'id' in a:
            self.ids.append(a['id'])
        for key in ('aria-labelledby', 'aria-describedby', 'aria-controls'):
            self.refs.extend(a.get(key, '').split())
        if tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}:
            self.headings.append(int(tag[1]))
        if tag == 'a':
            self.links.append(a)
            href = a['href']
            if href.startswith('#'):
                self.refs.append(href[1:])
            elif not href.startswith('https:'):
                assert Path(href).is_file(), href
        if tag == 'img':
            self.images.append(a)
            assert a.get('alt'), a
            with Image.open(a['src']) as im:
                assert im.size == (int(a['width']), int(a['height'])), a['src']
            assert a.get('loading') == ('eager' if '/hero/' in a['src'] else 'lazy')
        if tag == 'source' and 'srcset' in a:
            assert self.stack[-1] == 'picture', a
            for candidate in a['srcset'].split(','):
                path = Path(candidate.strip().split()[0])
                assert path.is_file(), path
                with Image.open(path) as im:
                    assert Image.MIME[im.format] == a['type'], path
                self.picture_sources.append(path)
        if tag == 'video':
            self.videos.append(a)
            assert Path(a['src']).is_file() and Path(a['data-poster']).is_file()
            assert a['preload'] == 'none' and {'muted', 'playsinline', 'controls'} <= a.keys()
        if tag == 'script':
            assert Path(a['src']).is_file()
        if tag == 'link' and a.get('rel') == 'stylesheet' and not a['href'].startswith('https:'):
            assert Path(a['href']).is_file()
        if tag == 'link' and a.get('rel') == 'icon':
            with Image.open(a['href']) as im:
                assert im.format == 'PNG' and a['type'] == 'image/png'
                assert a['sizes'] == f'{im.width}x{im.height}', a['href']
    def handle_endtag(self, tag):
        assert self.stack and self.stack.pop() == tag, tag

html = Path('index.html').read_text()
a = Audit()
a.feed(html)
assert not a.stack
assert len(a.ids) == len(set(a.ids))
assert set(a.refs) <= set(a.ids)
assert a.headings.count(1) == 1
assert all(current <= previous + 1 for previous, current in zip(a.headings, a.headings[1:]))
for category in ('beauty', 'fashion', 'bridal', 'drop'):
    assert html.count(f'class="category-intro category-intro--{category}"') == 1
assert html.count('<details class="service-row"') == 4
external = [link for link in a.links if link['href'].startswith('https:')]
assert [link['href'] for link in external] == ['https://www.instagram.com/mayconcenaa/', 'https://wa.me/5531995283510?text=Ol%C3%A1%2C%20Maycon%21%20Tudo%20bem%3F%20Conheci%20seu%20trabalho%20atrav%C3%A9s%20do%20seu%20portf%C3%B3lio%20e%20gostei%20muito%20do%20que%20vi.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20um%20projeto.%20Podemos%20conversar%3F']
assert all(link['target'] == '_blank' and set(link['rel'].split()) == {'noopener', 'noreferrer'} for link in external)
manifest = json.loads(Path('docs/asset-manifest.json').read_text())
verified = 0
for item in manifest['files']:
    if item.get('destination'):
        p = Path(item['destination'])
        assert hashlib.sha256(p.read_bytes()).hexdigest() == item['sha256'], p
        verified += 1
print(f'PASS: HTML structure, headings, anchors, ARIA, {len(a.images)} images, {len(a.videos)} videos, exact contact URLs, {verified} original hashes.')
print(f'PASS: {len(a.picture_sources)} picture sources exist and match their declared image types.')
print('Repeated image references (existing introduction/content usage):', {p: n for p,n in Counter(i['src'] for i in a.images).items() if n > 1})
print('Largest referenced image:', max((Path(i['src']).stat().st_size, i['src']) for i in a.images))
