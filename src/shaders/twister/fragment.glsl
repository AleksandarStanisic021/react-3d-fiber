uniform float uTime;

varying vec2 vUv;
varying vec3 vLocalPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  float flow = vLocalPosition.x * 38.0
    + vLocalPosition.y * 10.0
    + sin(vLocalPosition.z * 14.0 - uTime * 2.0) * 2.0
    - uTime * 8.0;
  float bands = smoothstep(0.35, 0.85, sin(flow));
  float pulse = 0.5 + 0.5 * sin(flow * 0.35 + uTime * 3.0);
  float fresnel = pow(
    1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0),
    2.0
  );

  vec3 deepBlue = vec3(0.015, 0.04, 0.22);
  vec3 violet = vec3(0.35, 0.04, 1.0);
  vec3 cyan = vec3(0.0, 0.95, 1.0);
  vec3 color = mix(deepBlue, violet, bands);
  color = mix(color, cyan, pulse * 0.35 + fresnel * 0.8);
  color += vec3(0.55, 0.85, 1.0) * pow(bands, 5.0) * 0.7;

  gl_FragColor = vec4(color, 1.0);
}
