"""Reproduce the three bounded QUT figure excerpts; requires PyMuPDF.

Reads immutable supplied course PDFs. Does not copy chapters or change source images.
Sources and reuse restrictions: public/egb339/study-figures/provenance.json.
"""
import argparse
from pathlib import Path
import pymupdf

parser = argparse.ArgumentParser()
parser.add_argument("--vault", type=Path, required=True)
args = parser.parse_args()
out = Path(__file__).resolve().parents[1] / "public/egb339/study-figures"
out.mkdir(parents=True, exist_ok=True)
figures = [
    ("raw/week7-motion-planning/Week 7 Tutorial - Motion Planning.pdf", 8, (0.52, 0.50, 1, 1), "qut-week7-velocity-profile.png"),
    ("raw/week8-images and image processing/EGB339 - 2026 - Lecture Week 8.pdf", 9, (0.03, 0.24, 0.96, 0.84), "qut-week8-spatula-histogram.png"),
    ("raw/week8-images and image processing/EGB339 - 2026 - Lecture Week 8.pdf", 14, (0.03, 0.20, 0.95, 0.81), "qut-week8-image-subtraction.png"),
]
for source, index, fractions, name in figures:
    with pymupdf.open(args.vault / source) as doc:
        page = doc[index]
        x0, y0, x1, y1 = fractions
        clip = pymupdf.Rect(x0 * page.rect.width, y0 * page.rect.height, x1 * page.rect.width, y1 * page.rect.height)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), clip=clip, alpha=False)
        pix.save(out / name)
        print(f"{name}: {pix.width} × {pix.height}; PDF page {index + 1}")
