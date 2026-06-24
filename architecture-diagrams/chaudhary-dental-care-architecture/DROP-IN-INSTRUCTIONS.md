# Drop-in instructions — wire diagrams into your portfolio

This bundle is staged exactly as it should sit inside your portfolio repo. Copy the two
trees into your portfolio root (paths are already correct/relative):

```
architecture-diagrams/                              ->  <portfolio>/architecture-diagrams/
public/images/chaudhary-dental-care-architecture/   ->  <portfolio>/public/images/chaudhary-dental-care-architecture/
```

From your portfolio root, e.g.:

```bash
cp -R architecture-diagrams "<portfolio>/architecture-diagrams"
mkdir -p "<portfolio>/public/images"
cp -R public/images/chaudhary-dental-care-architecture \
      "<portfolio>/public/images/chaudhary-dental-care-architecture"
```

## 1. (Optional) Re-render the PNGs yourself

The PNGs are already rendered. To regenerate from source (Graphviz must be installed —
`brew install graphviz` / `apt-get install graphviz`):

```bash
cd <portfolio>
for f in architecture-diagrams/dot/*.dot; do
  base=$(basename "$f" .dot)
  dot -Tpng -Gdpi=140 "$f" \
    -o "public/images/chaudhary-dental-care-architecture/$base.png"
done
```

Do **not** render with mermaid-cli — it needs a bundled Chromium that is network-blocked
in CI. Graphviz is the renderer of record. The Mermaid sources in
`architecture-diagrams/src/` are kept only as an equivalent, human-readable copy.

## 2. Wire into `src/data/portfolio.ts`

Open `src/data/portfolio.ts`, find the project object whose `title === "Chaudhary Dental Care"`,
and paste the `diagrams` array from `portfolio-diagrams-array.ts` **right after that
project's `caseStudy` block** (same placement/shape as the StreamSphere project).

Do **not** modify `ArchitectureCarousel.tsx` or `CaseStudyModal.tsx` — they already
consume `project.diagrams`. (If your portfolio doesn't have them yet, replicate the
StreamSphere versions.)

## 3. Verify

```bash
cd <portfolio>
npx tsc --noEmit
npx eslint src/data/portfolio.ts

# No diagram PNGs anywhere except public/ :
find . -path ./node_modules -prune -o -name "*.png" -print | grep architecture
# -> every hit must be under public/images/chaudhary-dental-care-architecture/
```

Both `tsc` and `eslint` must pass. If `rm` of any stray copy fails with
"Operation not permitted", grant delete permission for the portfolio folder and retry.
