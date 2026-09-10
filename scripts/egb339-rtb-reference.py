#!/usr/bin/env python3
"""Generate independent EGB339 numeric fixtures using the local RTB checkout.
Run in an isolated reference venv; stdout is JSON (no frontend dependency).
Model source: RTB ET2.R()*ET2.tx(L1)*ET2.R()*ET2.tx(L2).
"""
import json
from importlib.metadata import version
import numpy as np
import roboticstoolbox as rtb
from spatialmath import SE2

cases = []
angles = [(0, 0), (0, np.pi / 2), (np.pi / 2, -np.pi / 2),
          (.7, -1.2), (-2.4, 2.9), (np.pi, np.pi)]
for l1, l2 in [(5, 7), (1, 1), (8, 2)]:
    chain = rtb.ET2.R() * rtb.ET2.tx(l1) * rtb.ET2.R() * rtb.ET2.tx(l2)
    dh = rtb.DHRobot([rtb.RevoluteDH(a=l1), rtb.RevoluteDH(a=l2)])
    for q in angles:
        total = np.asarray(chain.fkine(q).A, dtype=float)
        dh_total = dh.fkine(q).A[np.ix_([0, 1, 3], [0, 1, 3])]
        np.testing.assert_allclose(total, dh_total, atol=1e-12)
        local = [link.A(angle).A[np.ix_([0, 1, 3], [0, 1, 3])].tolist()
                 for link, angle in zip(dh.links, q)]
        cases.append(dict(model=dict(l1=l1, l2=l2), q=list(q), t01=local[0], t12=local[1], t02=total.tolist()))
# Check the supplied unit-length DH and ETS model definitions as well.
for q in angles:
    a = rtb.models.ETS.Planar2().fkine(q).A
    b = rtb.models.DH.Planar2().fkine(q).A[np.ix_([0, 1, 3], [0, 1, 3])]
    np.testing.assert_allclose(np.asarray(a, dtype=float), b, atol=1e-12)
a, b = SE2(1, 2, np.pi / 6), SE2(2, 1, 0)
print(json.dumps(dict(
    generator="scripts/egb339-rtb-reference.py",
    model="ET2.R() * ET2.tx(L1) * ET2.R() * ET2.tx(L2), independently cross-checked against DHRobot",
    versions={name: version(name) for name in ["roboticstoolbox-python", "spatialmath-python", "numpy"]},
    cases=cases, composition=dict(ab=(a * b).A.tolist(), ba=(b * a).A.tolist())
), separators=(",", ":")))
