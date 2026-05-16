// tweaks.jsx — small custom tweak panel for the Mary Skinner site
// Exposes accent color swatches, cursor follower, and hero layout variant

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ED0874",
  "showCursor": true,
  "heroLayout": "Editorial",
  "tileSaturation": 96
}/*EDITMODE-END*/;

function SiteTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to :root + global state
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--magenta', t.accent);
    r.style.setProperty('--magenta-soft', t.accent);
    // tile saturation
    document.querySelectorAll('.tile .tile-img').forEach((el) => {
      el.style.filter = `saturate(${t.tileSaturation / 100})`;
    });
    // cursor follower visibility
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.style.display = t.showCursor ? '' : 'none';
    // hero layout variant
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.remove('layout-editorial', 'layout-centered', 'layout-index');
      hero.classList.add('layout-' + t.heroLayout.toLowerCase());
      if (t.heroLayout === 'Centered') {
        hero.style.gridTemplateColumns = '1fr';
        const side = hero.querySelector('.hero-side');
        if (side) side.style.display = 'none';
        const main = hero.querySelector('.hero-main');
        if (main) { main.style.textAlign = 'center'; main.style.alignItems = 'center'; }
      } else {
        hero.style.gridTemplateColumns = '';
        const side = hero.querySelector('.hero-side');
        if (side) side.style.display = '';
        const main = hero.querySelector('.hero-main');
        if (main) { main.style.textAlign = ''; main.style.alignItems = ''; }
      }
    }
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Color">
        <TweakColor
          label="Accent"
          value={t.accent}
          options={['#ED0874', '#C73E2E', '#B68942', '#1F5F4E', '#3A4A8A']}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweakSection>

      <TweakSection title="Hero">
        <TweakRadio
          label="Layout"
          value={t.heroLayout}
          options={['Editorial', 'Centered']}
          onChange={(v) => setTweak('heroLayout', v)}
        />
      </TweakSection>

      <TweakSection title="Imagery">
        <TweakSlider
          label="Tile saturation"
          min={70} max={120} step={1}
          value={t.tileSaturation}
          onChange={(v) => setTweak('tileSaturation', v)}
        />
      </TweakSection>

      <TweakSection title="Motion">
        <TweakToggle
          label="Custom cursor follower"
          value={t.showCursor}
          onChange={(v) => setTweak('showCursor', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<SiteTweaks />);
