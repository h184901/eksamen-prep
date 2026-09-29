/** Focused English explanation for the Week 10 camera lesson and its topic page. */
export const egb339PinholeCameraEn = String.raw`> [!abstract] Intuition
> Rays from a 3D point pass through the camera centre. A more distant point appears closer to the optical axis. Intrinsics convert the projected position into pixels; extrinsics locate the camera relative to the world. This material comes from the combined Weeks 10–11 lecture. — [Week 10](/egb339/uker/uke-10), lecture pp. 19–25.

## Similar triangles

First express the point as $(X_C,Y_C,Z_C)$ in the **camera** frame. With the lecture's virtual image plane and positive-axis convention, similar triangles give

$$
x=f\frac{X_C}{Z_C},\qquad y=f\frac{Y_C}{Z_C},\qquad Z_C>0.
$$

Here $x,y$ are physical positions on the image plane, not pixel indices. At $f=1.8\,\mathrm{mm}$ and $Z_C=2\,\mathrm{m}$, a corner $X_C=1\,\mathrm{m}$ projects $0.9\,\mathrm{mm}$ from the optical axis. Doubling the depth halves that offset. The physical sensor behind a pinhole forms an inverted image; the virtual plane uses the opposite sign convention. — [Week 10](/egb339/uker/uke-10), lecture pp. 20–23.

## Intrinsics and pixels

If $\rho_u,\rho_v$ are physical pixel widths and $(u_0,v_0)$ is the principal point, write $f_u=f/\rho_u$ and $f_v=f/\rho_v$. The intrinsic matrix and pixel coordinates are

$$
K=\begin{bmatrix}f_u&0&u_0\\0&f_v&v_0\\0&0&1\end{bmatrix},\qquad
u=f_u\frac{X_C}{Z_C}+u_0,\quad v=f_v\frac{Y_C}{Z_C}+v_0.
$$

The focal lengths in $K$ are measured in **pixels**. A physical focal length in millimetres alone cannot give numerical pixel coordinates: pixel pitch and the principal point are also needed. This $3\times3$ form separates the perspective matrix $[I\;0]$ from intrinsics; the lecture also presents the combined $3\times4$ form. — [Week 10](/egb339/uker/uke-10), lecture pp. 23–25.

## Extrinsics and homogeneous projection

Let $T_{WC}$ denote the camera-to-world pose. To project a world point, invert it first: $P_C=T_{WC}^{-1}P_W$. The full mapping is

$$
\tilde p=K[I\;0]T_{WC}^{-1}P_W,\qquad
u=\frac{\tilde u}{\tilde w},\quad v=\frac{\tilde v}{\tilde w}.
$$

The last division matters: homogeneous image coordinates are not yet pixel coordinates. On a known plane, [a planar homography](/egb339/temaer/planar-homographies) combines these steps, but it does not project arbitrary 3D points without depth. — [Week 10](/egb339/uker/uke-10), lecture pp. 24–29.

## Common mistakes

- Using world coordinates directly in the pinhole equation without converting to the camera frame.
- Mixing millimetres with metres, or treating physical focal length as if it were already in pixels.
- Dividing by zero or ignoring the sign convention for the image plane.
- Forgetting to divide homogeneous image coordinates by their third component.

For a worked square-and-camera example, including why numeric corner pixels cannot be given from the available sensor data, continue to [Week 11](/egb339/uker/uke-11).`;
