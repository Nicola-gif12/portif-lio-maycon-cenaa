"""Static packaging regression tests; example.com is a fixture, not a site domain."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('build_static', ROOT / 'scripts/build_static.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class BuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'source'
        self.root.mkdir()
        (self.root / 'index.html').write_text((ROOT / 'index.html').read_text())
        (self.root / 'robots.txt').write_text('User-agent: *\nAllow: /\n')
        (self.root / 'assets').mkdir()
        (self.root / 'assets/site.css').write_text('body { color: black; }')
        (self.root / '.env').write_text('TEST_FIXTURE=not-a-real-secret')
        (self.root / 'docs').mkdir()
        (self.root / 'docs/private.txt').write_text('test fixture')
        self.output = Path(self.temp.name) / 'public'
        self.patcher = patch.object(builder, 'ROOT', self.root)
        self.patcher.start()
        self.addCleanup(self.patcher.stop)

    def test_no_domain_does_not_invent_urls_or_sitemap(self):
        builder.build(self.output)
        page = (self.output / 'index.html').read_text()
        self.assertNotIn('rel="canonical"', page)
        self.assertNotIn('property="og:url"', page)
        self.assertNotIn('name="twitter:image"', page)
        self.assertFalse((self.output / 'sitemap.xml').exists())
        self.assertNotIn('Sitemap:', (self.output / 'robots.txt').read_text())

    def test_confirmed_url_is_consistent_with_subdirectory(self):
        base = 'https://example.com/portfolio/'
        builder.build(self.output, base.rstrip('/'))
        page = (self.output / 'index.html').read_text()
        self.assertIn(f'rel="canonical" href="{base}"', page)
        self.assertIn(f'property="og:url" content="{base}"', page)
        image = base + builder.SOCIAL_IMAGE
        self.assertIn(f'property="og:image" content="{image}"', page)
        self.assertIn(f'name="twitter:image" content="{image}"', page)
        urls = ElementTree.parse(self.output / 'sitemap.xml').findall('.//{*}loc')
        self.assertEqual([item.text for item in urls], [base])
        self.assertIn(f'Sitemap: {base}sitemap.xml', (self.output / 'robots.txt').read_text())

    def test_only_public_files_are_packaged(self):
        builder.build(self.output)
        self.assertEqual({str(p.relative_to(self.output)) for p in self.output.rglob('*') if p.is_file()},
                         {'index.html', 'robots.txt', 'assets/site.css'})

    def test_existing_output_is_not_overwritten(self):
        self.output.mkdir()
        kept = self.output / 'keep.txt'
        kept.write_text('keep')
        with self.assertRaises(ValueError):
            builder.build(self.output)
        self.assertEqual(kept.read_text(), 'keep')

    def test_local_or_invalid_urls_are_rejected(self):
        for value in ['http://example.com', 'https://localhost', 'https://127.0.0.1',
                      'https://10.0.0.1', 'https://user:password@example.com',
                      'https://example.com/?preview=true', 'https://example.com/#hero',
                      'https://example.com/a/../b', 'https://example.com/has space']:
            with self.subTest(value=value), self.assertRaises(ValueError):
                builder.production_url(value)

    def test_hidden_assets_and_symlinks_are_rejected(self):
        hidden = self.root / 'assets/.env'
        hidden.write_text('fixture')
        with self.assertRaises(ValueError):
            builder.build(self.output)
        hidden.unlink()
        (self.root / 'assets/link.css').symlink_to(self.root / 'assets/site.css')
        with self.assertRaises(ValueError):
            builder.build(self.output)


if __name__ == '__main__':
    unittest.main()
